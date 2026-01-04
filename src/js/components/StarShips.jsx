import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContexts";
import { Link } from "react-router";
import imagenNoDisponible from "../../img/imagen.png";

const StarShips = () => {
    const URL_BASIC_API = "https://www.swapi.tech/api/starships";

    const { state, dispatch } = useContext(AppContext);
    const { data, loading, error } = state.starships;
    const favorites = state.favorites;

    const [nextUrl, setNextUrl] = useState(null);
    const [prevUrl, setPrevUrl] = useState(null);

    const isFavorite = (star) =>
        favorites.some(
            fav => fav.uid === star.uid && fav.type === "starships"
        );

    const getStarShips = async (url = URL_BASIC_API) => {
        try {
            dispatch({ type: "FETCH_START", entity: "starships" });

            const res = await fetch(url);
            if (!res.ok) throw new Error("No se pudieron conseguir las naves");

            const json = await res.json();

            setNextUrl(json.next);
            setPrevUrl(json.previous);

            dispatch({
                type: "FETCH_SUCCESS",
                entity: "starships",
                payload: json.results
            });
        } catch (err) {
            dispatch({
                type: "FETCH_ERROR",
                entity: "starships",
                payload: err.message
            });
        }
    };

    useEffect(() => {
        getStarShips();
    }, []);

    return (
        <>
            <h1 className="sw-title">Naves</h1>

            {!loading && (
                <Link to="/">
                    <h2 className="sw-title">Volver al Inicio</h2>
                </Link>
            )}

            <div className="container">
                <div className="row">
                    {data && !loading && data.map(star => (
                        <div key={star.uid} className="sw-card-container">
                            <div className="sw-card">
                                <div className="elemento-imagen">
                                    <img
                                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/starships/${star.uid}.jpg`}
                                        alt={star.name}
                                        onError={(e) => {
                                            e.target.src = imagenNoDisponible;
                                        }}
                                    />
                                </div>

                                <div className="elemento-detalles">
                                    <h2 className="character-name">{star.name}</h2>

                                    <Link to={`/starships/details/${star.uid}`}>
                                        <button className="sw-btn my-3">
                                            Ver más
                                        </button>
                                    </Link>

                                    <button
                                        className={`sw-btn-fav ${isFavorite(star) ? "is-favorite" : ""}`}
                                        onClick={() =>
                                            dispatch({
                                                type: isFavorite(star)
                                                    ? "REMOVE_FAVORITE"
                                                    : "ADD_FAVORITE",
                                                payload: {
                                                    uid: star.uid,
                                                    name: star.name,
                                                    type: "starships"
                                                }
                                            })
                                        }
                                    >
                                        {isFavorite(star) ? "💔 Quitar" : "❤️ Favorito"}
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
                                onClick={() => getStarShips(prevUrl)}
                            >
                                ⬅️ Anterior
                            </button>
                        )}

                        {!loading && (
                            <button
                                className="sw-btn sw-btn-next"
                                disabled={!nextUrl}
                                onClick={() => getStarShips(nextUrl)}
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

export default StarShips;
