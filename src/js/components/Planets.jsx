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
            <h1 className="sw-title">Planetas</h1>
            <Link to={"/"}>
                <h2 className="sw-title">Volver al Inicio</h2>
            </Link>

            <div className="container">
                <div className="row">
                    {planetas && !cargando && planetas.map(planeta => (
                        <div key={planeta.uid} className="sw-card-container">
                            <div className="sw-card">
                                <div className="elemento-imagen">
                                    <img
                                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/planets/${planeta.uid}.jpg`}
                                        className="card-img-top"
                                        alt={planeta.properties.name}
                                        onError={(e) => {
                                            e.target.src = imagenNoDisponible;
                                        }}
                                    />
                                </div>
                                <div className="elemento-detalles">
                                    <h2 className="character-name">{planeta.properties.name}</h2>

                                    <p><span className="label">Clima:</span> {planeta.properties.climate}</p>
                                    <p><span className="label">Superficie Agua:</span> {planeta.properties.surface_water}</p>
                                    <p><span className="label">Diámetro:</span> {planeta.properties.diameter}</p>
                                    <p><span className="label">Periodo de Rotación:</span> {planeta.properties.rotation_period}</p>
                                    <p><span className="label">Periodo de Orbitación:</span> {planeta.properties.orbital_period}</p>
                                    <p><span className="label">Gravedad:</span> {planeta.properties.gravity}</p>
                                    <a href={`${planeta.properties.url}`}>Info-API</a>
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

export default Planets;