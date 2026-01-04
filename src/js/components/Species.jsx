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

    const [nextUrl, setNextUrl] = useState()
    const [prevUrl, setPrevUrl] = useState()

    const getSpecieBasics = async (url = URL_BASIC_SPECIES) => {
        try {
            setCargando(true)
            const res = await fetch(url)
            if (!res.ok) throw new Error("No se han podido conseguir los datos basicos de las especies")

            const data = await res.json();
            setNextUrl(data.next)
            setPrevUrl(data.previous)
            setEspecies(data.results)
            setCargando(false)

        } catch (error) {
            console.error(error)
            setError(true)
        }
    }

    useEffect(() => {
        if (especies.length === 0) {
            getSpecieBasics();
        }
    }, [])



    return (
        <>
            <h1 className="sw-title">Especies</h1>
            {!cargando &&
                <Link to={"/"}>
                    <h2 className="sw-title">Volver al Inicio</h2>
                </Link>
            }

            <div className="container">
                <div className="row">
                    {especies && !cargando && especies.map(especie => (
                        <div key={especie.uid} className="sw-card-container">
                            <div className="sw-card">
                                <div className="elemento-imagen">
                                    <img
                                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/species/${especie.uid}.jpg`}
                                        className="card-img-top"
                                        alt={especie.name}
                                        onError={(e) => {
                                            e.target.src = imagenNoDisponible;
                                        }}
                                    />
                                </div>
                                <div className="elemento-detalles">
                                    <h2 className="character-name">{especie.name}</h2>

                                    <Link to={`/species/details/${especie.uid}`}>
                                        <button className="sw-btn my-3">
                                            Ver más
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="sw-pagination">
                        {!cargando &&
                            <button
                                className="sw-btn sw-btn-prev"
                                disabled={!prevUrl || cargando}
                                onClick={() => getSpecieBasics(prevUrl)}
                            >
                                ⬅️ Anterior
                            </button>
                        }

                        {!cargando &&
                            <button
                                className="sw-btn sw-btn-next"
                                disabled={!nextUrl || cargando}
                                onClick={() => getSpecieBasics(nextUrl)}
                            >
                                Siguiente ➡️
                            </button>
                        }
                    </div>
                    {cargando && !error && <h1 className="sw-title">Cargando desde muy muy lejos...</h1>}
                    {error && <h1 className="sw-title">Oh no! error ocurrir por razón alguna</h1>}
                </div>
            </div>
        </>
    )
}

export default Species;