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
            getSpecieDetails(data.results)

        } catch (error) {
            console.error(error)
            setError(true)
        }
    }

    const getSpecieDetails = async (species) => {
        try {
            const promises = species.map(async (specie) => {

                const res = await fetch(specie.url);
                const data = await res.json();
                const especie = data.result

                let homeworldName = "Desconocido"
                if (especie.properties.homeworld) {
                    try {
                        const planetRes = await fetch(especie.properties.homeworld);
                        const planetData = await planetRes.json();
                        homeworldName = planetData.result.properties.name;
                    } catch {
                        homeworldName = "Desconocido"
                    }
                }

                return {
                    ...especie,
                    homeworldName
                };
            });

            const details = await Promise.all(promises)
            setEspecies(details)
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
            <h1 className="sw-title">Esepcies</h1>
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
                                        alt={especie.properties.name}
                                        onError={(e) => {
                                            e.target.src = imagenNoDisponible;
                                        }}
                                    />
                                </div>
                                <div className="elemento-detalles">
                                    <h5 className="character-name">{especie.properties.name}</h5>

                                    <p><span className="label">Tipo de Animal:</span> {especie.properties.classification}</p>
                                    <p><span className="label">Designacion:</span> {especie.properties.designation}</p>
                                    <p><span className="label">Color de ojos:</span> {especie.properties.eye_colors}</p>
                                    <p><span className="label">Lenguaje:</span> {especie.properties.language}</p>
                                    <p><span className="label">Planeta de origen:</span> {especie.homeworldName}</p>
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

export default Species;