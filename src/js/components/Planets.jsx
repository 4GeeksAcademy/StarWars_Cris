import React from "react";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContexts";
import imagenNoDisponible from "../../img/imagen.png"

const Planets = () => {

    const URL_BASIC_PLANETS = "https://www.swapi.tech/api/planets"

    const {
        planetas,
        setPlanetas
    } = useContext(AppContext)

    const[error, setError] = useState(false)
    const[cargando, setCargando] = useState(false)

    const[nextUrl, setNextUrl] = useState()
    const[prevUrl, setPrevUrl] = useState()


    const getPlanetBasics = async (url = URL_BASIC_PLANETS) => {
        try {
            setCargando(true)
            const res = await fetch(url)
            if (!res.ok) throw new Error("No se ha cargado la informacion basica de los planetas")

            const data = await res.json();
            setNextUrl(data.next)
            setPrevUrl(data.previous)
            getPlanetDetails(data.results)

        } catch (error) {
            setError(true)
            console.error(error)
        }
    }

    const getPlanetDetails = async (planets) => {
        try {
            const promises = planets.map(planet =>
                fetch(planet.url)
                    .then(res => {
                        if (!res.ok) {
                            throw new Error("No se pudieron conseguir los detalles")
                        }
                        return res.json();
                    })
                    .then(data => data.result)
            )

            const details = await Promise.all(promises);
            setPlanetas(details)
            setCargando(false)


        } catch (error) {
            setError(true)
            console.error(error)
        }
    }

    useEffect(() => {
        if (planetas.length === 0) {
            getPlanetBasics();
        }
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    {planetas && planetas.map(planeta => (
                        <div key={planeta.uid} className="col-xl-4 col-md-6 col-sm-12">
                            <div className="card mb-3">
                                <img
                                    src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/planets/${planeta.uid}.jpg`}
                                    className="card-img-top"
                                    alt={planeta.properties.name}
                                    onError={(e) => {
                                        e.target.src = imagenNoDisponible;
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{planeta.properties.name}</h5>
                                    <a href="#" className="btn btn-primary">Ver Más</a>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="d-flex justify-content-between mt-4">
                        <button
                            className="btn btn-secondary"
                            disabled={!prevUrl || cargando}
                            onClick={() => getPlanetBasics(prevUrl)}
                        >
                            Anterior
                        </button>

                        <button
                            className="btn btn-primary"
                            disabled={!nextUrl || cargando}
                            onClick={() => getPlanetBasics(nextUrl)}
                        >
                            Siguiente
                        </button>
                    </div>
                    {error && <h1>Oh no! ha ocurrido un error</h1>}
                    {cargando && <h1>Cargando...</h1>}
                </div>
            </div>
        </>
    )
}

export default Planets;