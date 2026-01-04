import React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContexts";
import imagenNoDisponible from "../../img/imagen.png"

const Characters = () => {

    const URL_BASIC_CHARACTERS = 'https://www.swapi.tech/api/people'

    const {
        personaje,
        setPersonaje,
    } = useContext(AppContext)

    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState(false)

    const [nextUrl, setNextUrl] = useState()
    const [prevUrl, setPrevUrl] = useState()



    const getCharacters = async (url = URL_BASIC_CHARACTERS) => {
        try {
            setCargando(true)
            const res = await fetch(url)
            if (!res.ok) throw new Error("No se pudo conseguir la informacion de los personajes.")

            const data = await res.json();
            setNextUrl(data.next)
            setPrevUrl(data.previous)
            setPersonaje(data.results)

            setCargando(false)
        } catch (error) {
            setError(true)
            console.error(error)
        }
    }

    useEffect(() => {
        if (personaje.length === 0) {
            getCharacters();
        }
    }, [])

    return (
        <>
            <h1 className="sw-title">Personajes</h1>

            {!cargando &&
                <Link to={"/"}>
                    <h2 className="sw-title">Volver al Inicio</h2>
                </Link>
            }
            <div className="container">
                <div className="row">
                    {personaje && !cargando && personaje.map(char => (
                        <div key={char.uid} className="sw-card-container">
                            <div className="sw-card">
                                <div className="elemento-imagen">
                                    <img
                                        src={`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${char.uid}.jpg`}
                                        alt={char.name}
                                        onError={(e) => {
                                            e.target.src = imagenNoDisponible;
                                        }}
                                    />
                                </div>

                                <div className="elemento-detalles">
                                    <h2 className="character-name">{char.name}</h2>

                                    <Link to={`/characters/details/${char.uid}`}>
                                        <button className="sw-btn my-3">
                                            Saber detalles
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
                                onClick={() => getCharacters(prevUrl)}
                            >
                                ⬅️ Anterior
                            </button>
                        }

                        {!cargando &&
                            <button
                                className="sw-btn sw-btn-next"
                                disabled={!nextUrl || cargando}
                                onClick={() => getCharacters(nextUrl)}
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

export default Characters;