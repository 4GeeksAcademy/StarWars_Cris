import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "./AppContexts";

const Films = () => {

    const URL_BASIC_API = 'https://www.swapi.tech/api/'

    const {
        pelicula,
        setPelicula,
    } = useContext(AppContext)

    const [error, setError] = useState("")

    const getFilms = () => {
        fetch(`${URL_BASIC_API}films/`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("No se pudo conseguir las peliculas")
                }
                return res.json();
            })
            .then(data => setPelicula(data.result))
            .catch(err => setError(err))
    }

    useEffect(() => {
        getFilms();
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    {pelicula && pelicula.map(film => (
                        <div className="col-xl-3 col-md-6 col-sm-12" key={film.uid}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{film.name}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                    {!pelicula && (
                        <div>
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Films;