import React from "react";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "./AppContexts";

import imagenNoDisponible from "../../img/imagen.png"
import { Link } from "react-router";

const StarShips = () => {

    const URL_BASIC_API = 'https://www.swapi.tech/api/starships'

    const {
        nave,
        setNave
    } = useContext(AppContext)

    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState(false)

    const [nextUrl, setNextUrl] = useState(null)
    const [prevUrl, setPrevUrl] = useState(null)

    const getStarShipsBasics = async (url = URL_BASIC_API) => {
        try {
            setCargando(true)
            const res = await fetch(url);
            if (!res.ok) throw new Error("No se pudieron conseguir las naves")

            const data = await res.json();
            setNextUrl(data.next)
            setPrevUrl(data.previous)
            setNave(data.results)
            setCargando(false)

        } catch (error) {
            console.log(error);
            setError(true)
        }

    }


    useEffect(() => {
        if (nave.length === 0) {
            getStarShipsBasics();
        }
    }, [])

    return (
        <>
            <h1 className="sw-title">Naves</h1>
            {!cargando &&
                <Link to={"/"}>
                    <h2 className="sw-title">Volver al Inicio</h2>
                </Link>
            }

            <div className="container">
                <div className="row">
                    {nave && !cargando && nave.map(star => (
                        <div key={star.uid} className="sw-card-container">
                            <div className="sw-card">
                                <div className="elemento-imagen">
                                    <img
                                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/starships/${star.uid}.jpg`}
                                        className="card-img-top"
                                        alt={star.name}
                                        onError={(e) => {
                                            e.target.src = imagenNoDisponible;
                                        }}
                                    />
                                </div>
                                <div className="elemento-detalles">
                                    <h2 className="character-name">{star.name}</h2>

                                    <Link to={`/starships/details/${star.uid}`}>
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
                                onClick={() => getStarShipsDetails(prevUrl)}
                            >
                                ⬅️ Anterior
                            </button>
                        }

                        {!cargando &&
                            <button
                                className="sw-btn sw-btn-next"
                                disabled={!nextUrl || cargando}
                                onClick={() => getStarShipsDetails(nextUrl)}
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

export default StarShips;