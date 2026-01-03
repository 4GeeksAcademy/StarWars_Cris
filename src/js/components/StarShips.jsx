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
            getStarShipsDetails(data.results)

        } catch (error) {
            console.log(error);
            setError(true)
        }

    }

    const getStarShipsDetails = async (ships) => {
        try {
            const promises = ships.map(ship =>
                fetch(ship.url)
                    .then(res => {
                        if (!res.ok) {
                            throw new Error("No se pudieron conseguir los detalles")
                        }
                        return res.json();
                    })
                    .then(data => data.result)
            )

            const details = await Promise.all(promises);
            setNave(details);
            setCargando(false)

        } catch (error) {
            console.log(error)
            setError(true)
        }
    }

    const getStarShipsNavigation = async () => {
        const res = await fetch(URL_BASIC_API);
        const data = await res.json();
        setNextUrl(data.next);
        setPrevUrl(data.previous);
    };

    useEffect(() => {
        if (nave.length === 0) {
            getStarShipsBasics();
        }
        getStarShipsNavigation();
    }, [])

    return (
        <>
            <h1 className="sw-title">Naves</h1>
            <Link to={"/"}>
                <h2 className="sw-title">Volver al Inicio</h2>
            </Link>

            <div className="container">
                <div className="row">
                    {nave && !cargando && nave.map(star => (
                        <div key={star.uid} className="sw-card-container">
                            <div className="sw-card">
                                <div className="elemento-imagen">
                                    <img
                                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/starships/${star.uid}.jpg`}
                                        className="card-img-top"
                                        alt={star.properties.name}
                                        onError={(e) => {
                                            e.target.src = imagenNoDisponible;
                                        }}
                                    />
                                </div>
                                <div className="elemento-detalles">
                                    <h2 className="character-name">{star.properties.name}</h2>

                                    <p><span className="label">Capacidad de Carga:</span> {star.properties.cargo_capacity}</p>
                                    <p><span className="label">Pasajeros:</span> {star.properties.passengers}</p>
                                    <p><span className="label">Velocidad atmosferica:</span> {star.properties.max_atmosphering_speed}</p>
                                    <p><span className="label">Coste:</span> {star.properties.cost_in_credits}</p>
                                    <p><span className="label">Largo:</span> {star.properties.length}</p>

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

export default StarShips;