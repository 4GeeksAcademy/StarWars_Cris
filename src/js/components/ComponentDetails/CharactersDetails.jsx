import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import imagenNoDisponible from "../../../img/imagen.png";

const CharacterDetails = () => {
    const URL_BASIC_CHAR_DETAILS = "https://www.swapi.tech/api/people/";
    const { id } = useParams();

    const [detailsChar, setDetailsChar] = useState(null);

    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState(false)

    const [homeworldName, setHomeworldName] = useState("Cargando...");

    const getCharactersDetails = async (id) => {
        try {
            setCargando(true);

            const res = await fetch(`${URL_BASIC_CHAR_DETAILS}${id}`);
            if (!res.ok) throw new Error("Error al cargar personaje");

            const data = await res.json();
            const character = data.result;
            setDetailsChar(character);

            if (character.properties.homeworld) {
                try {
                    const planetRes = await fetch(character.properties.homeworld);
                    const planetData = await planetRes.json();
                    setHomeworldName(planetData.result.properties.name);
                } catch {
                    setHomeworldName("Desconocido");
                }
            } else {
                setHomeworldName("Desconocido");
            }

            setCargando(false);
        } catch (err) {
            console.error(err);
            setError(true);
            setCargando(false);
        }
    };


    useEffect(() => {
        getCharactersDetails(id)
    }, [id]);

    return (
        <>
            {cargando && <h1 className="sw-title">Se esta cargando el personaje</h1>}
            {!cargando && <h1 className="sw-title"> Información de:</h1>}

            <div className="container">
                <div className="row">
                    {detailsChar &&
                        <div key={detailsChar.uid} className="sw-card">
                            <div className="elemento-imagen">
                                <img
                                    src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/characters/${detailsChar.uid}.jpg`}
                                    alt={detailsChar.properties.name}
                                    onError={(e) => {
                                        e.target.src = imagenNoDisponible;
                                    }}
                                >
                                </img>
                            </div>
                            <div className="elemento-detalles">
                                <h2 className="character-name">{detailsChar.properties.name}</h2>

                                <p><span className="label">Género:</span> {detailsChar.properties.gender}</p>
                                <p><span className="label">Altura:</span> {detailsChar.properties.height}</p>
                                <p><span className="label">Peso:</span> {detailsChar.properties.mass}</p>
                                <p><span className="label">Color de piel:</span> {detailsChar.properties.skin_color}</p>
                                <p><span className="label">Color de pelo:</span> {detailsChar.properties.hair_color}</p>
                                <p><span className="label">Color de ojo:</span> {detailsChar.properties.eye_color}</p>
                                <p><span className="label">Planeta Natal:</span> {homeworldName}</p>
                            </div>
                        </div>

                    }
                    {!cargando &&
                        <Link to={"/characters"}>
                            <button className="sw-btn my-4">
                                ⬅️ Volver a Personajes
                            </button>
                        </Link>
                    }

                </div>
            </div>
        </>
    );
};

export default CharacterDetails;
