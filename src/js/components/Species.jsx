import React from "react";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContexts";
import imagenNoDisponible from "../../img/imagen.png"

const Species = () => {

    const URL_BASIC_SPECIES = "https://www.swapi.tech/api/species"

    const {
        especies,
        setEspecies
    } = useContext(AppContext)

    const [error, setError] = useState(false)
    const [cargando, setCargando] = useState(false)

    const[nextUrl, setNextUrl] = useState()
    const[prevUrl, setPrevUrl] = useState()

    const getSpecieBasics = async (url = URL_BASIC_SPECIES) => {
        try {
            setCargando(true)
            const res = await fetch(url)
            if (!res.ok) throw new Error("No se han podido conseguir los datos basicos de las especies")

            const data = await res.json();
            setNextUrl(data.next)
            setPrevUrl(data.previous)
            getSpecieDetails(data.results)

        } catch (error) {
            console.error(error)
            setError(true)
        }
    }

    const getSpecieDetails = async (species) => {
        try {
            const promises = species.map(specie =>
                fetch(specie.url)
                    .then(res => {
                        if (!res.ok) {
                            throw new Error("No se pudieron conseguir los detalles")
                        }
                        return res.json();
                    })
                    .then(data => data.result)
            )

            const details = await Promise.all(promises)
            setEspecies(details)
            setCargando(false)

        } catch (error) {
            console.error(error)
            setError(true)
        }

    }

    useEffect(()=>{
        if(especies.length === 0){
            getSpecieBasics();
        }
    },[])



    return (
        <>
            <div className="container">
                <div className="row">
                    {especies && especies.map(especie => (
                        <div key={especie.uid} className="col-xl-4 col-md-6 col-sm-12">
                            <div className="card mb-3">
                                <img
                                    src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/species/${especie.uid}.jpg`}
                                    className="card-img-top"
                                    alt={especie.properties.name}
                                    onError={(e) => {
                                        e.target.src = imagenNoDisponible;
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{especie.properties.name}</h5>
                                    <a href="#" className="btn btn-primary">Ver Más</a>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="d-flex justify-content-between mt-4">
                        <button
                            className="btn btn-secondary"
                            disabled={!prevUrl || cargando}
                            onClick={() => getSpecieBasics(prevUrl)}
                        >
                            Anterior
                        </button>

                        <button
                            className="btn btn-primary"
                            disabled={!nextUrl || cargando}
                            onClick={() => getSpecieBasics(nextUrl)}
                        >
                            Siguiente
                        </button>
                    </div>
                    {cargando && !error && <h1>Cargando...</h1>}
                    {error && <h1>Se ha producido un error</h1>}
                </div>
            </div>
        </>
    )
}

export default Species;