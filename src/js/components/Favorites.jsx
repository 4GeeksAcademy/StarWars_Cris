import { useContext } from "react";
import { AppContext } from "./AppContexts";
import { Link } from "react-router-dom";
import imagenNoDisponible from "../../img/imagen.png";

const Favorites = () => {

    const TYPE_TO_ROUTE = {
        people: "characters",
        starships: "starships",
        vehicles: "vehicles",
        planets: "planets",
        species: "species",
        films: "films"
    };

    const { state, dispatch } = useContext(AppContext);
    const favorites = state.favorites;

    return (
        <>
            <h1 className="sw-title">⭐ Favoritos</h1>

            <Link to={"/"}>
                <h2 className="sw-title">Volver al Inicio</h2>
            </Link>

            <div className="container">
                <div className="row">
                    {favorites.length === 0 && (
                        <h2 className="sw-title">No hay favoritos aún</h2>
                    )}

                    {favorites.map((fav) => (
                        <div key={`${fav.type}-${fav.uid}`} className="sw-card-container">
                            <div className="sw-card">
                                <div className="elemento-imagen">
                                    <img src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${TYPE_TO_ROUTE[fav.type]}/${fav.uid}.jpg`}
                                        alt={fav.name}
                                        onError={(e) => {
                                            e.target.src = imagenNoDisponible;
                                        }}
                                    />

                                </div>
                                <div className="elemento-detalles">
                                    <h2 className="character-name">{fav.name}</h2>
                                    <p className="label">Tipo: {fav.type}</p>

                                    <button
                                        className="sw-btn my-3"
                                        onClick={() =>
                                            dispatch({
                                                type: "REMOVE_FAVORITE",
                                                payload: fav
                                            })
                                        }
                                    >
                                        💔 Quitar
                                    </button>
                                    {fav.type !== "films" && (
                                        <Link to={`/${TYPE_TO_ROUTE[fav.type]}/details/${fav.uid}`}>
                                            <button className="sw-btn">Ver detalle</button>
                                        </Link>
                                    )}

                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
};

export default Favorites;
