import React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContexts";
import imagenNoDisponible from "../../img/imagen.png"

const Characters = () => {

    const URL_BASIC_CHARACTERS = 'https://www.swapi.tech/api/people'

    const { state, dispatch } = useContext(AppContext);
    const { data, loading, error } = state.people;
    const favorites = state.favorites;



    const [nextUrl, setNextUrl] = useState()
    const [prevUrl, setPrevUrl] = useState()




    const getCharacters = async (url = URL_BASIC_CHARACTERS) => {
        try {
            dispatch({ type: "FETCH_START", entity: "people" });

            const res = await fetch(url);
            const data = await res.json();
            setNextUrl(data.next)
            setPrevUrl(data.previous)

            dispatch({
                type: "FETCH_SUCCESS",
                entity: "people",
                payload: data.results
            });
        } catch (err) {
            dispatch({
                type: "FETCH_ERROR",
                entity: "people",
                payload: err.message
            });
        }
    };


    useEffect(() => {

        getCharacters();

    }, []);


    return (
        <>
            <h1 className="sw-title">Personajes</h1>

            {!loading && (
                <Link to={"/"}>
                    <h2 className="sw-title">Volver al Inicio</h2>
                </Link>
            )}

            <div className="container">
                <div className="row">

                    {data && !loading && data.map(char => {
                        const isFavorite = favorites.some(
                            fav => fav.uid === char.uid && fav.type === "people"
                        );

                        return (
                            <div key={char.uid} className="sw-card-container">
                                <div className="sw-card">
                                    <div className="elemento-imagen">
                                        <img
                                            src={`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${char.uid}.jpg`}
                                            alt={char.name}
                                            onError={(e) => e.target.src = imagenNoDisponible}
                                        />
                                    </div>

                                    <div className="elemento-detalles">
                                        <h2 className="character-name">{char.name}</h2>

                                        <Link to={`/characters/details/${char.uid}`}>
                                            <button className="sw-btn my-3">Saber detalles</button>
                                        </Link>

                                        <button
                                            className="sw-btn-fav"
                                            onClick={() =>
                                                dispatch({
                                                    type: isFavorite ? "REMOVE_FAVORITE" : "ADD_FAVORITE",
                                                    payload: {
                                                        uid: char.uid,
                                                        name: char.name,
                                                        type: "people"
                                                    }
                                                })
                                            }
                                        >
                                            {isFavorite ? "💔 Quitar" : "❤️ Favorito"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}


                    <div className="sw-pagination">
                        {!loading && (
                            <button
                                className="sw-btn sw-btn-prev"
                                disabled={!prevUrl}
                                onClick={() => getCharacters(prevUrl)}
                            >
                                ⬅️ Anterior
                            </button>
                        )}

                        {!loading && (
                            <button
                                className="sw-btn sw-btn-next"
                                disabled={!nextUrl}
                                onClick={() => getCharacters(nextUrl)}
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
    )
}

export default Characters;