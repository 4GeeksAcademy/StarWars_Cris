import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContexts";
import imagenNoDisponible from "../../img/imagen.png";

const Species = () => {
    const URL_BASIC_SPECIES = "https://www.swapi.tech/api/species";

    const { state, dispatch } = useContext(AppContext);
    const { data, loading, error } = state.species;
    const favorites = state.favorites;

    const [nextUrl, setNextUrl] = useState(null);
    const [prevUrl, setPrevUrl] = useState(null);

    const isFavorite = (especie) =>
        favorites.some(
            fav => fav.uid === especie.uid && fav.type === "species"
        );

    const getSpecies = async (url = URL_BASIC_SPECIES) => {
        try {
            dispatch({ type: "FETCH_START", entity: "species" });

            const res = await fetch(url);
            if (!res.ok) throw new Error("Error cargando especies");

            const result = await res.json();

            setNextUrl(result.next);
            setPrevUrl(result.previous);

            dispatch({
                type: "FETCH_SUCCESS",
                entity: "species",
                payload: result.results
            });
        } catch (err) {
            dispatch({
                type: "FETCH_ERROR",
                entity: "species",
                payload: err.message
            });
        }
    };

    useEffect(() => {
        getSpecies();
    }, []);

    return (
        <>
            <h1 className="sw-title">Especies</h1>

            {!loading && (
                <Link to="/">
                    <h2 className="sw-title">Volver al Inicio</h2>
                </Link>
            )}

            <div className="container">
                <div className="row">
                    {data && !loading && data.map((especie) => (
                        <div key={especie.uid} className="sw-card-container">
                            <div className="sw-card">
                                <div className="elemento-imagen">
                                    <img
                                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/species/${especie.uid}.jpg`}
                                        alt={especie.name}
                                        onError={(e) => {
                                            e.target.src = imagenNoDisponible;
                                        }}
                                    />
                                </div>

                                <div className="elemento-detalles">
                                    <h2 className="character-name">{especie.name}</h2>

                                    <Link to={`/species/details/${especie.uid}`}>
                                        <button className="sw-btn my-3">
                                            Ver más
                                        </button>
                                    </Link>

                                    <button
                                        className={`sw-btn-fav ${isFavorite(especie) ? "is-favorite" : ""}`}
                                        onClick={() =>
                                            dispatch({
                                                type: isFavorite(especie)
                                                    ? "REMOVE_FAVORITE"
                                                    : "ADD_FAVORITE",
                                                payload: {
                                                    uid: especie.uid,
                                                    name: especie.name,
                                                    type: "species"
                                                }
                                            })
                                        }
                                    >
                                        {isFavorite(especie) ? "💔 Quitar" : "❤️ Favorito"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="sw-pagination">
                        {!loading && (
                            <button
                                className="sw-btn sw-btn-prev"
                                disabled={!prevUrl}
                                onClick={() => getSpecies(prevUrl)}
                            >
                                ⬅️ Anterior
                            </button>
                        )}

                        {!loading && (
                            <button
                                className="sw-btn sw-btn-next"
                                disabled={!nextUrl}
                                onClick={() => getSpecies(nextUrl)}
                            >
                                Siguiente ➡️
                            </button>
                        )}
                    </div>

                    {loading && !error && (
                        <h1 className="sw-title">Cargando desde muy muy lejos...</h1>
                    )}

                    {error && (
                        <h1 className="sw-title">Oh no! error ocurrir por razón alguna</h1>
                    )}
                </div>
            </div>
        </>
    );
};

export default Species;
