import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "./AppContexts";

const Films = () => {

    const URL_BASIC_API = 'https://www.swapi.tech/api/films'

    const {
        pelicula,
        setPelicula,
    } = useContext(AppContext)

    const getFilmsBasic = async () => {
        try{
            const res = await fetch(`${URL_BASIC_API}`)
            if(!res.ok) throw new Error("No se pudo conseguir la información básica de las peliculas")

            const data = await res.json();
            setPelicula(data.result)
            console.log(data.result)
        }catch (error) { 
            console.error(error);
        }
    }

    useEffect(() => {
        if(pelicula.length === 0){
            getFilmsBasic();
        }
    }, [])

    return (
        <div className="container">
            <div className="row">
                {pelicula.map(film => (
                    <div className="col-xl-3 col-md-6 col-sm-12" key={film.uid}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {film.properties.title}
                                </h5>
                                <img src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/films/${film.uid}.jpg`}></img>
                                <p className="card-text">
                                    Episodio {film.properties.episode_id}:
                                </p>
                                <p className="card-text">
                                    Fecha de estreno: {film.properties.release_date}
                                </p>
                                <button className="btn btn-primary">
                                    Ver Más
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Films;