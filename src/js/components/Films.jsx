import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "./AppContexts";
import { Link } from "react-router";

const Films = () => {

    const URL_BASIC_API = 'https://www.swapi.tech/api/films'

    const {
        pelicula,
        setPelicula,
    } = useContext(AppContext)

    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState(false)


    const getFilmsBasic = async () => {
        try {
            setCargando(true)
            const res = await fetch(`${URL_BASIC_API}`)
            if (!res.ok) throw new Error("No se pudo conseguir la información básica de las peliculas")

            const data = await res.json();
            setPelicula(data.result)
            setCargando(false)

        } catch (error) {
            setError(true)
            console.error(error);
        }
    }

    useEffect(() => {
        if (pelicula.length === 0) {
            getFilmsBasic();
        }
    }, [])

    return (
        <>
            <h1 className="sw-title">Películas</h1>
            {
                !cargando &&
                <Link to={"/"}>
                    <h2 className="sw-title">Volver al Inicio</h2>
                </Link>
            }

            <div className="container">
                <div className="row">
                    {pelicula && !cargando && pelicula.map(film => (
                        <div className="sw-card-container" key={film.uid}>
                            <div className="sw-card">
                                <div className="elemento-imagen">
                                    <img src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/films/${film.uid}.jpg`}></img>
                                </div>
                                <div className="elemento-detalles">
                                    <h2 className="character-name">{film.properties.title}</h2>
                                    <p><span className="label">Fecha de lanzamiento:</span> {film.properties.release_date}</p>
                                    <p><span className="label">Director:</span> {film.properties.director}</p>
                                    <button className="sw-btn my-3">
                                        Ver Más
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                    {cargando && !error && <h1 className="sw-title">Cargando desde muy muy lejos...</h1>}
                    {error && <h1 className="sw-title">Oh no! error ocurrir por razón alguna</h1>}
                </div>
            </div>
        </>
    );
}

export default Films;