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

    const [error, setError] = useState(false)
    const [cargando, setCargando] = useState(false)

    const [nextUrl, setNextUrl] = useState()
    const [prevUrl, setPrevUrl] = useState()


    const getPlanetBasics = async (url = URL_BASIC_PLANETS) => {
        try {
            setCargando(true)
            const res = await fetch(url)
            if (!res.ok) throw new Error("No se ha cargado la informacion basica de los planetas")

            const data = await res.json();
            setNextUrl(data.next)
            setPrevUrl(data.previous)
            setPlanetas(data.results)
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
            <h1 className="sw-title">Planetas</h1>
            {!cargando &&
                <Link to={"/"}>
                    <h2 className="sw-title">Volver al Inicio</h2>
                </Link>
            }


            <div className="container">
                <div className="row">
                    {planetas && !cargando && planetas.map(planeta => (
                        <div key={planeta.uid} className="sw-card-container">
                            <div className="sw-card">
                                <div className="elemento-imagen">
                                    <img
                                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/planets/${planeta.uid}.jpg`}
                                        className="card-img-top"
                                        alt={planeta.name}
                                        onError={(e) => {
                                            e.target.src = imagenNoDisponible;
                                        }}
                                    />
                                </div>
                                <div className="elemento-detalles">
                                    <h2 className="character-name">{planeta.name}</h2>

                                    <Link to={`/planets/details/${planeta.uid}`}>
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
                                onClick={() => getPlanetBasics(prevUrl)}
                            >
                                ⬅️ Anterior
                            </button>
                        }

                        {!cargando &&
                            <button
                                className="sw-btn sw-btn-next"
                                disabled={!nextUrl || cargando}
                                onClick={() => getPlanetBasics(nextUrl)}
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

export default Planets;