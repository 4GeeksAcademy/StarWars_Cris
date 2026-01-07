import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import imagenNoDisponible from "../../../img/imagen.png";

const VehiclesDetails = () => {
    const URL_BASIC_VEHICLE_DETAILS = "https://www.swapi.tech/api/vehicles/";
    const { id } = useParams();

    const [detailsVehicle, setDetailsVehicle] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(false);

    const getVehicleDetails = async (id) => {
        try {
            setCargando(true);

            const res = await fetch(`${URL_BASIC_VEHICLE_DETAILS}${id}`);
            if (!res.ok) throw new Error("Error al cargar el vehículo");

            const data = await res.json();
            setDetailsVehicle(data.result);

            setCargando(false);
        } catch (err) {
            console.error(err);
            setError(true);
            setCargando(false);
        }
    };

    useEffect(() => {
        getVehicleDetails(id);
    }, [id]);

    const vehicle = detailsVehicle.properties;

    return (
        <>
            {cargando && <h1 className="sw-title">Se esta cargando el personaje</h1>}
            {!cargando && <h1 className="sw-title"> Información de:</h1>}
            
            <h1 className="sw-title">Información del vehículo</h1>

            <div className="container">
                <div className="row">
                    <div className="sw-card">
                        <div className="elemento-imagen">
                            <img
                                src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/vehicles/${detailsVehicle.uid}.jpg`}
                                alt={vehicle.name}
                                onError={(e) => {
                                    e.target.src = imagenNoDisponible;
                                }}
                            />
                        </div>

                        <div className="elemento-detalles">
                            <h2 className="character-name">{vehicle.name}</h2>

                            <p><span className="label">Modelo:</span> {vehicle.model}</p>
                            <p><span className="label">Fabricante:</span> {vehicle.manufacturer}</p>
                            <p><span className="label">Clase:</span> {vehicle.vehicle_class}</p>
                            <p><span className="label">Coste:</span> {vehicle.cost_in_credits}</p>
                            <p><span className="label">Longitud:</span> {vehicle.length}</p>
                            <p><span className="label">Tripulación:</span> {vehicle.crew}</p>
                            <p><span className="label">Pasajeros:</span> {vehicle.passengers}</p>
                            <p><span className="label">Capacidad de carga:</span> {vehicle.cargo_capacity}</p>
                            <p><span className="label">Velocidad atmosférica:</span> {vehicle.max_atmosphering_speed}</p>

                            <Link to="/vehicles">
                                <button className="sw-btn mt-4">
                                    ⬅️ Volver a Vehículos
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VehiclesDetails;
