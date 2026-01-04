import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import imagenNoDisponible from "../../../img/imagen.png";

const PlanetsDetails = () => {
    const URL_BASIC_PLANET_DETAILS = "https://www.swapi.tech/api/planets/";
    const { id } = useParams();

    const [detailsPlanet, setDetailsPlanet] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(false);

    const getPlanetDetails = async (id) => {
        try {
            setCargando(true);

            const res = await fetch(`${URL_BASIC_PLANET_DETAILS}${id}`);
            if (!res.ok) throw new Error("Error al cargar el planeta");

            const data = await res.json();
            setDetailsPlanet(data.result);

            setCargando(false);
        } catch (err) {
            console.error(err);
            setError(true);
            setCargando(false);
        }
    };

    useEffect(() => {
        getPlanetDetails(id);
    }, [id]);

    if (cargando) {
        return <h1 className="sw-title">Cargando planeta desde muy muy lejos...</h1>;
    }

    if (error || !detailsPlanet) {
        return <h1 className="sw-title">Error cargando el planeta</h1>;
    }

    const planet = detailsPlanet.properties;

    return (
        <>
            <h1 className="sw-title">Información del planeta</h1>

            <div className="container">
                <div className="row">
                    <div className="sw-card">
                        <div className="elemento-imagen">
                            <img
                                src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/planets/${detailsPlanet.uid}.jpg`}
                                alt={planet.name}
                                onError={(e) => {
                                    e.target.src = imagenNoDisponible;
                                }}
                            />
                        </div>

                        <div className="elemento-detalles">
                            <h2 className="character-name">{planet.name}</h2>

                            <p><span className="label">Clima:</span> {planet.climate}</p>
                            <p><span className="label">Terreno:</span> {planet.terrain}</p>
                            <p><span className="label">Población:</span> {planet.population}</p>
                            <p><span className="label">Diámetro:</span> {planet.diameter}</p>
                            <p><span className="label">Gravedad:</span> {planet.gravity}</p>
                            <p><span className="label">Periodo de rotación:</span> {planet.rotation_period}</p>
                            <p><span className="label">Periodo orbital:</span> {planet.orbital_period}</p>
                            <p><span className="label">Agua en superficie:</span> {planet.surface_water}%</p>

                            <Link to="/planets">
                                <button className="sw-btn mt-4">
                                    ⬅️ Volver
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlanetsDetails;
