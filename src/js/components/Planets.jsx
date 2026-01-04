import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContexts";
import imagenNoDisponible from "../../img/imagen.png";

const Planets = () => {
    const URL_BASIC_PLANETS = "https://www.swapi.tech/api/planets";

    const { state, dispatch } = useContext(AppContext);
    const { data, loading, error } = state.planets;
    const favorites = state.favorites;

    const [nextUrl, setNextUrl] = useState(null);
    const [prevUrl, setPrevUrl] = useState(null);

    const isFavorite = (planeta) =>
        favorites.some(
            fav => fav.uid === planeta.uid && fav.type === "planets"
        );

    const getPlanets = async (url = URL_BASIC_PLANETS) => {
        try {
            dispatch({ type: "FETCH_START", entity: "planets" });

            const res = await fetch(url);
            if (!res.ok) throw new Error("Error cargando planetas");

            const result = await res.json();

            setNextUrl(result.next);
            setPrevUrl(result.previous);

            dispatch({
                type: "FETCH_SUCCESS",
                entity: "planets",
                payload: result.results
            });
        } catch (err) {
            dispatch({
                type: "FETCH_ERROR",
                entity: "planets",
                payload: err.message
            });
        }
    };

    useEffect(() => {
        getPlanets();
    }, []);

    return (
        <>
            <h1 className="sw-title">Planetas</h1>

            {!loading && (
                <Link to="/">
                    <h2 className="sw-title">Volver al Inicio</h2>
                </Link>
            )}

            <div className="container">
                <div className="row">
                    {data && !loading && data.map((planeta) => (
                        <div key={planeta.uid} className="sw-card-container">
                            <div className="sw-card">
                                <div className="elemento-imagen">
                                    <img
                                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/planets/${planeta.uid}.jpg`}
                                        alt={planeta.name}
                                        onError={(e) => {
                                            e.target.src = imagenNoDisponible;
                                        }}
                                    />
                                </div>

                                <div className="elemento-detalles">
                                    <h2 className="character-name">{planeta.name}</h2>

                                    <Link to={`/planets/details/${planeta.uid}`}>
                                        <button className="sw-btn my-3">
                                            Ver más
                                        </button>
                                    </Link>

                                    <button
                                        className={`sw-btn-fav ${isFavorite(planeta) ? "is-favorite" : ""}`}
                                        onClick={() =>
                                            dispatch({
                                                type: isFavorite(planeta)
                                                    ? "REMOVE_FAVORITE"
                                                    : "ADD_FAVORITE",
                                                payload: {
                                                    uid: planeta.uid,
                                                    name: planeta.name,
                                                    type: "planets"
                                                }
                                            })
                                        }
                                    >
                                        {isFavorite(planeta) ? "💔 Quitar" : "❤️ Favorito"}
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
                                onClick={() => getPlanets(prevUrl)}
                            >
                                ⬅️ Anterior
                            </button>
                        )}

                        {!loading && (
                            <button
                                className="sw-btn sw-btn-next"
                                disabled={!nextUrl}
                                onClick={() => getPlanets(nextUrl)}
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

export default Planets;
