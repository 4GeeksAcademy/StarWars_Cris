import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import imagenNoDisponible from "../../../img/imagen.png";

const StarshipsDetails = () => {
    const URL_BASIC_STARSHIP_DETAILS = "https://www.swapi.tech/api/starships/";
    const { id } = useParams();

    const [detailsStarship, setDetailsStarship] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(false);

    const getStarshipDetails = async (id) => {
        try {
            setCargando(true);

            const res = await fetch(`${URL_BASIC_STARSHIP_DETAILS}${id}`);
            if (!res.ok) throw new Error("Error al cargar la nave");

            const data = await res.json();
            setDetailsStarship(data.result);

            setCargando(false);
        } catch (err) {
            console.error(err);
            setError(true);
            setCargando(false);
        }
    };

    useEffect(() => {
        getStarshipDetails(id);
    }, [id]);

    const ship = detailsStarship.properties;

    return (
        <>
            {cargando && <h1 className="sw-title">Se esta cargando el personaje</h1>}
            {!cargando && <h1 className="sw-title"> Información de:</h1>}
            
            <h1 className="sw-title">Información de la nave</h1>

            <div className="container">
                <div className="row">
                    <div className="sw-card">
                        <div className="elemento-imagen">
                            <img
                                src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/starships/${detailsStarship.uid}.jpg`}
                                alt={ship.name}
                                onError={(e) => {
                                    e.target.src = imagenNoDisponible;
                                }}
                            />
                        </div>

                        <div className="elemento-detalles">
                            <h2 className="character-name">{ship.name}</h2>

                            <p><span className="label">Modelo:</span> {ship.model}</p>
                            <p><span className="label">Fabricante:</span> {ship.manufacturer}</p>
                            <p><span className="label">Clase:</span> {ship.starship_class}</p>
                            <p><span className="label">Coste:</span> {ship.cost_in_credits}</p>
                            <p><span className="label">Longitud:</span> {ship.length}</p>
                            <p><span className="label">Tripulación:</span> {ship.crew}</p>
                            <p><span className="label">Pasajeros:</span> {ship.passengers}</p>
                            <p><span className="label">Capacidad de carga:</span> {ship.cargo_capacity}</p>
                            <p><span className="label">Velocidad atmosférica:</span> {ship.max_atmosphering_speed}</p>
                            <p><span className="label">Hyperdrive:</span> {ship.hyperdrive_rating}</p>
                            <p><span className="label">MGLT:</span> {ship.MGLT}</p>

                            <Link to="/starships">
                                <button className="sw-btn mt-4">
                                    ⬅️ Volver a Starships
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StarshipsDetails;
