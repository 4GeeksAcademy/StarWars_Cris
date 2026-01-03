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

            getVehiclesDetail(data.results);

        } catch (error) {
            setError(true);
            console.error(error);
        }
    };


    const getVehiclesDetail = async (vehicles) => {
        try {
            const promises = vehicles.map(vehicle =>
                fetch(vehicle.url)
                    .then(res => res.json())
                    .then(data => data.result)
            )

            const details = await Promise.all(promises);
            setVehiculos(details);
            setCargando(false)

        } catch (error) {
            setError(true)
            console.error(error)
        }
    }

    useEffect(() => {
        if (vehiculos.length === 0) {
            getVehiclesBasics();
        }
    }, [])


    return (
        <>
            <div className="container">
                <div className="row">
                    {vehiculos && vehiculos.map(vehiculo => (
                        <div key={vehiculo.uid} className="col-xl-4 col-md-6 col-sm-12">
                            <div className="card mb-3">
                                <img
                                    src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/vehicles/${vehiculo.uid}.jpg`}
                                    className="card-img-top"
                                    alt={vehiculo.properties.name}
                                    onError={(e) => {
                                        e.target.src = imagenNoDisponible;
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{vehiculo.properties.name}</h5>
                                    <a href="#" className="btn btn-primary">Ver Más</a>
                                </div>
                            </div>

                        </div>
                    ))}
                    <div className="d-flex justify-content-between mt-4">
                        <button
                            className="btn btn-secondary"
                            disabled={!prevUrl || cargando}
                            onClick={() => getVehiclesBasics(prevUrl)}
                        >
                            Anterior
                        </button>

                        <button
                            className="btn btn-primary"
                            disabled={!nextUrl || cargando}
                            onClick={() => getVehiclesBasics(nextUrl)}
                        >
                            Siguiente
                        </button>
                    </div>

                    {cargando && <h1>Cargando...</h1>}
                    {error && <h1>Oh no! ha ocurrido un error</h1>}
                </div>
            </div>
        </>
    )
}

export default Vehicles;