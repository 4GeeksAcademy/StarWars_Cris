import React from "react";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "./AppContexts";

const StarShips = () => {

    const URL_BASIC_API = 'https://www.swapi.tech/api/'

    const {
        nave,
        setNave
    } = useContext(AppContext)

    const getStarShips = () => {
        fetch(`${URL_BASIC_API}/starships/`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("No se pudieron conseguir las naves")
                }
                return res.json();
            })
            .then(data => setNave(data.results))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getStarShips();
    }, [])

    return (
        <>
            <h1>Naves Espaciales</h1>

            <div className="container">
                <div className="row">
                    {nave && nave.map(star => (
                        <div key={star.uid} className="col-xl-3 col-md-6 col-sm-12">
                            <div className="card-title mb-3">
                                <img src={"https://vieraboschkova.github.io/swapi-gallery/static/assets/img/starships/" + star.uid + ".jpg"} className="card-img-top" alt={star.name}></img>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title">{star.name}</h1>
                                <p>{}</p>
                                <a href="" className="btn btn-primary">Ver Más</a>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}

export default StarShips;