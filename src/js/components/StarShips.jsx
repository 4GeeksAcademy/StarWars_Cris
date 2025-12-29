import React from "react";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "./AppContexts";

import imagenNoDisponible from "../../img/imagen.png"

const StarShips = () => {

    const URL_BASIC_API = 'https://www.swapi.tech/api/starships'

    const {
        nave,
        setNave
    } = useContext(AppContext)

    const [naveBasic, setNaveBasic] = useState([])

    const getStarShipsBasics = async () => {
        try {
            const res = await fetch(`${URL_BASIC_API}`);
            if (!res.ok) throw new Error("No se pudieron conseguir las naves")

            const data = await res.json();
            setNaveBasic(data.results);
            getStarShipsDetails(data.results)

            console.log(data.results)

        } catch (error) {
            console.log(error);
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
            

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(nave === 0){
            getStarShipsBasics();
        }
    }, [])

    return (
        <>
            <h1>Naves Espaciales</h1>

            <div className="container">
                <div className="row">
                    {nave.map(star => (
                        <div key={star.uid} className="col-xl-4 col-md-6 col-sm-12">
                            <div className="card mb-3">
                                <img
                                    src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/starships/${star.uid}.jpg`}
                                    className="card-img-top"
                                    alt={star.properties.name}
                                    onError={(e) => {
                                        e.target.src = imagenNoDisponible;
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{star.properties.name}</h5>
                                    <a href="#" className="btn btn-primary">Ver Más</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default StarShips;