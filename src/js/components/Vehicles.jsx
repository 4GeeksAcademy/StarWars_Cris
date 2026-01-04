import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContexts";
import imagenNoDisponible from "../../img/imagen.png";

const Vehicles = () => {
    const URL_BASIC_VEHICLES = "https://www.swapi.tech/api/vehicles";

    const { state, dispatch } = useContext(AppContext);
    const { data, loading, error } = state.vehicles;
    const favorites = state.favorites;

    const [nextUrl, setNextUrl] = useState(null);
    const [prevUrl, setPrevUrl] = useState(null);

    const isFavorite = (vehiculo) =>
        favorites.some(
            fav => fav.uid === vehiculo.uid && fav.type === "vehicles"
        );

    const getVehicles = async (url = URL_BASIC_VEHICLES) => {
        try {
            dispatch({ type: "FETCH_START", entity: "vehicles" });

            const res = await fetch(url);
            if (!res.ok) throw new Error("Error cargando vehículos");

            const result = await res.json();

            setNextUrl(result.next);
            setPrevUrl(result.previous);

            dispatch({
                type: "FETCH_SUCCESS",
                entity: "vehicles",
                payload: result.results
            });
        } catch (err) {
            dispatch({
                type: "FETCH_ERROR",
                entity: "vehicles",
                payload: err.message
            });
        }
    };

    useEffect(() => {
        getVehicles();
    }, []);

    return (
        <>
            <h1 className="sw-title">Vehículos</h1>

            {!loading && (
                <Link to="/">
                    <h2 className="sw-title">Volver al Inicio</h2>
                </Link>
            )}

            <div className="container">
                <div className="row">
                    {data && !loading && data.map((vehiculo) => (
                        <div key={vehiculo.uid} className="sw-card-container">
                            <div className="sw-card">
                                <div className="elemento-imagen">
                                    <img
                                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/vehicles/${vehiculo.uid}.jpg`}
                                        alt={vehiculo.name}
                                        onError={(e) => {
                                            e.target.src = imagenNoDisponible;
                                        }}
                                    />
                                </div>

                                <div className="elemento-detalles">
                                    <h2 className="character-name">{vehiculo.name}</h2>

                                    <Link to={`/vehicles/details/${vehiculo.uid}`}>
                                        <button className="sw-btn my-3">
                                            Ver más
                                        </button>
                                    </Link>

                                    <button
                                        className={`sw-btn-fav ${isFavorite(vehiculo) ? "is-favorite" : ""}`}
                                        onClick={() =>
                                            dispatch({
                                                type: isFavorite(vehiculo)
                                                    ? "REMOVE_FAVORITE"
                                                    : "ADD_FAVORITE",
                                                payload: {
                                                    uid: vehiculo.uid,
                                                    name: vehiculo.name,
                                                    type: "vehicles"
                                                }
                                            })
                                        }
                                    >
                                        {isFavorite(vehiculo) ? "💔 Quitar" : "❤️ Favorito"}
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
                                onClick={() => getVehicles(prevUrl)}
                            >
                                ⬅️ Anterior
                            </button>
                        )}

                        {!loading && (
                            <button
                                className="sw-btn sw-btn-next"
                                disabled={!nextUrl}
                                onClick={() => getVehicles(nextUrl)}
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

export default Vehicles;
