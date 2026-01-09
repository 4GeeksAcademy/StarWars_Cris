import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import imagenNoDisponible from "../../../img/imagen.png";

const SpeciesDetails = () => {
    const URL_BASIC_SPECIE_DETAILS = "https://www.swapi.tech/api/species/";
    const { id } = useParams();

    const [detailsSpecie, setDetailsSpecie] = useState(null);
    const [homeworldName, setHomeworldName] = useState("Cargando...");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(false);

    const getSpecieDetails = async (id) => {
        try {
            setCargando(true);

            const res = await fetch(`${URL_BASIC_SPECIE_DETAILS}${id}`);
            if (!res.ok) throw new Error("Error al cargar la especie");

            const data = await res.json();
            const specie = data.result;
            setDetailsSpecie(specie);

            if (specie.properties.homeworld) {
                try {
                    const planetRes = await fetch(specie.properties.homeworld);
                    const planetData = await planetRes.json();
                    setHomeworldName(planetData.result.properties.name);
                } catch {
                    setHomeworldName("Desconocido");
                }
            } else {
                setHomeworldName("No definido");
            }

            setCargando(false);
        } catch (err) {
            console.error(err);
            setError(true);
            setCargando(false);
        }
    };

    useEffect(() => {
        getSpecieDetails(id);
    }, [id]);

     if (cargando) {
        return <h1 className="sw-title">Cargando especie desde muy muy lejos...</h1>;
    }

    if (error) {
        return <h1 className="sw-title">Error cargando la nave</h1>;
    }

    if (!detailsSpecie) {
        return null;
    }

    return (
        <>
            {!cargando && <h1 className="sw-title"> Información de:</h1>}
            
            <h1 className="sw-title">Información de la especie</h1>

            <div className="container">
                <div className="row">
                    <div className="sw-card">
                        <div className="elemento-imagen">
                            <img
                                src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/species/${detailsSpecie.uid}.jpg`}
                                alt={detailsSpecie.properties.name}
                                onError={(e) => {
                                    e.target.src = imagenNoDisponible;
                                }}
                            />
                        </div>

                        <div className="elemento-detalles">
                            <h2 className="character-name">
                                {detailsSpecie.properties.name}
                            </h2>

                            <p><span className="label">Clasificación:</span> {detailsSpecie.properties.classification}</p>
                            <p><span className="label">Designación:</span> {detailsSpecie.properties.designation}</p>
                            <p><span className="label">Altura media:</span> {detailsSpecie.properties.average_height}</p>
                            <p><span className="label">Color de piel:</span> {detailsSpecie.properties.skin_colors}</p>
                            <p><span className="label">Color de pelo:</span> {detailsSpecie.properties.hair_colors}</p>
                            <p><span className="label">Color de ojos:</span> {detailsSpecie.properties.eye_colors}</p>
                            <p><span className="label">Lenguaje:</span> {detailsSpecie.properties.language}</p>
                            <p><span className="label">Planeta natal:</span> {homeworldName}</p>

                            <Link to="/species">
                                <button className="sw-btn mt-4">
                                    ⬅️ Volver a Especies
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SpeciesDetails;
