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
            getCharactersDetails(data.results)

        } catch (error) {
            setError(true)
            console.error(error)
        }
    }

    const getCharactersDetails = async (chars) => {
        try {
            const promises = chars.map(async (char) => {
                const res = await fetch(char.url);
                const data = await res.json();
                const character = data.result;

                let homeworldName = "Desconocido";

                if (character.properties.homeworld) {
                    try {
                        const planetRes = await fetch(character.properties.homeworld);
                        const planetData = await planetRes.json();
                        homeworldName = planetData.result.properties.name;
                    } catch {
                        homeworldName = "Desconocido";
                    }
                }

                return {
                    ...character,
                    homeworldName
                };
            });

            const details = await Promise.all(promises);
            setPersonaje(details);
            setCargando(false);

        } catch (error) {
            console.error(error);
            setError(true);
            setCargando(false);
        }
    };



    useEffect(() => {
        if (personaje.length === 0) {
            getCharacters();
        }
    }, [])

    return (
        <>
            <h1 className="sw-title">Personajes</h1>

            <Link to={"/"}>
                <h2 className="sw-title">Volver al Inicio</h2>
            </Link>
            <div className="container">
                <div className="row">
                    {personaje && !cargando && personaje.map(char => (
                        <div key={char.uid} className="sw-card-container">
                            <div className="sw-card">
                                <div className="elemento-imagen">
                                    <img
                                        src={`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${char.uid}.jpg`}
                                        alt={char.properties.name}
                                        onError={(e) => {
                                            e.target.src = imagenNoDisponible;
                                        }}
                                    />
                                </div>

                                <div className="elemento-detalles">
                                    <h2 className="character-name">{char.properties.name}</h2>

                                    <p><span className="label">Altura:</span> {char.properties.height} cm</p>
                                    <p><span className="label">Peso:</span> {char.properties.mass} kg</p>
                                    <p><span className="label">Género:</span> {char.properties.gender === "n/a" ? "No deberías preguntar eso..." : char.properties.gender}</p>
                                    <p><span className="label">Color de pelo:</span> {char.properties.hair_color === "n/a" ? "No tiene un pelo de tonto" : char.properties.hair_color}</p>
                                    <p><span className="label">Fecha de nacimiento:</span> {char.properties.birth_year}</p>
                                    <p><span className="label">Planeta natal:</span>{char.homeworldName}</p>

                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="sw-pagination">
                        {!cargando &&
                            <button
                                className="sw-btn sw-btn-prev"
                                disabled={!prevUrl || cargando}
                                onClick={() => getVehiclesBasics(prevUrl)}
                            >
                                ⬅️ Anterior
                            </button>
                        }

                        {!cargando &&
                            <button
                                className="sw-btn sw-btn-next"
                                disabled={!nextUrl || cargando}
                                onClick={() => getVehiclesBasics(nextUrl)}
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