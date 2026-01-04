import React, { useContext, useEffect } from "react";
import { AppContext } from "./AppContexts";
import { Link } from "react-router-dom";

const Films = () => {
    const URL_BASIC_API = "https://www.swapi.tech/api/films";

    const { state, dispatch } = useContext(AppContext);
    const { data, loading, error } = state.films;
    const favorites = state.favorites;

    const isFavorite = (film) =>
        favorites.some(
            fav => fav.uid === film.uid && fav.type === "films"
        );

    const getFilms = async () => {
        try {
            dispatch({ type: "FETCH_START", entity: "films" });

            const res = await fetch(URL_BASIC_API);
            if (!res.ok) throw new Error("Error cargando películas");

            const result = await res.json();

            dispatch({
                type: "FETCH_SUCCESS",
                entity: "films",
                payload: result.result
            });
        } catch (err) {
            dispatch({
                type: "FETCH_ERROR",
                entity: "films",
                payload: err.message
            });
        }
    };

    useEffect(() => {
        getFilms();
    }, []);

    return (
        <>
            <h1 className="sw-title">Películas</h1>

            {!loading && (
                <Link to="/">
                    <h2 className="sw-title">Volver al Inicio</h2>
                </Link>
            )}

            <div className="container">
                <div className="row">
                    {data && !loading && data.map((film) => (
                        <div className="sw-card-container" key={film.uid}>
                            <div className="sw-card">
                                <div className="elemento-imagen">
                                    <img
                                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/films/${film.uid}.jpg`}
                                        alt={film.properties.title}
                                    />
                                </div>

                                <div className="elemento-detalles">
                                    <h2 className="character-name">
                                        {film.properties.title}
                                    </h2>

                                    <h3>
                                        <span className="label">Episodio:</span>{" "}
                                        {film.properties.episode_id}
                                    </h3>

                                    <p>
                                        <span className="label">Fecha de lanzamiento:</span>{" "}
                                        {film.properties.release_date}
                                    </p>

                                    <p>
                                        <span className="label">Director:</span>{" "}
                                        {film.properties.director}
                                    </p>

                                    <p className="film-synopsis">
                                        <span className="label">Sinópsis:</span>{" "}
                                        {film.properties.opening_crawl}
                                    </p>

                                    <button
                                        className={`sw-btn-fav my-3`}
                                        onClick={() =>
                                            dispatch({
                                                type: isFavorite(film)
                                                    ? "REMOVE_FAVORITE"
                                                    : "ADD_FAVORITE",
                                                payload: {
                                                    uid: film.uid,
                                                    name: film.properties.title,
                                                    type: "films"
                                                }
                                            })
                                        }
                                    >
                                        {isFavorite(film) ? "💔 Quitar" : "❤️ Favorito"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {loading && !error && (
                        <h1 className="sw-title">Cargando desde muy muy lejos...</h1>
                    )}

                    {error && (
                        <h1 className="sw-title">
                            Oh no! error ocurrir por razón alguna
                        </h1>
                    )}
                </div>
            </div>
        </>
    );
};

export default Films;
