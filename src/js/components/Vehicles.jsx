import React from "react";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContexts";
import imagenNoDisponible from "../../img/imagen.png"

const Vehicles = () => {

    const URL_BASIC_VEHICLES = "https://www.swapi.tech/api/vehicles"

    const {
        vehiculos,
        setVehiculos
    } = useContext(AppContext)

    const [error, setError] = useState(false)
    const [cargando, setCargando] = useState(false)

    const [nextUrl, setNextUrl] = useState(null);
    const [prevUrl, setPrevUrl] = useState(null);


    const getVehiclesBasics = async (url = URL_BASIC_VEHICLES) => {
        try {
            setCargando(true);
            setError(false);

            const res = await fetch(url);
            if (!res.ok) throw new Error("Error cargando vehículos");

            const data = await res.json();

            setNextUrl(data.next);
            setPrevUrl(data.previous);
            setVehiculos(data.results)
            setCargando(false)

        } catch (error) {
            setError(true);
            console.error(error);
        }
    };

    useEffect(() => {
        if (vehiculos.length === 0) {
            getVehiclesBasics();
        }
    }, [])


    return (
        <>
            <h1 className="sw-title">Vehículos</h1>
            {!cargando &&
                <Link to={"/"}>
                    <h2 className="sw-title">Volver al Inicio</h2>
                </Link>
            }
            <div className="container">
                <div className="row">
                    {vehiculos && !cargando && vehiculos.map(vehiculo => (
                        <div key={vehiculo.uid} className="sw-card-container">
                            <div className="sw-card">
                                <div className="elemento-imagen">
                                    <img
                                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/vehicles/${vehiculo.uid}.jpg`}
                                        className="card-img-top"
                                        alt={vehiculo.name}
                                        onError={(e) => {
                                            e.target.src = imagenNoDisponible;
                                        }}
                                    />
                                </div>
                                <div className="elemento-detalles">
                                    <h2 className="character-name">{vehiculo.name}</h2>
                                    <Link to={`/vehicles/details/${vehiculo.uid}`}>
                                        <button className="sw-btn my-3">
                                            Ver más
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
                                onClick={() => getVehiclesBasics(prevUrl)}
                            >
                                ⬅️ Anterior
                            </button>
                        }

                        {!cargando &&
                            <button
                                className="sw-btn sw-btn-next"
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

export default Vehicles;