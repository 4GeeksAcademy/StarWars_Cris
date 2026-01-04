import React, { useContext, useEffect } from "react";
import { AppContext } from "./AppContexts";
import { Link } from "react-router";
import Footer from "./Footer";

const MainPage = () => {

    return (

        <>
            <div className="btn-group-category">
                <Link to="/characters">
                    <button className="btn-category">
                        🧑‍🚀 Characters
                    </button>
                </Link>

                <Link to="/films">
                    <button className="btn-category">
                        🎬 Films
                    </button>
                </Link>

                <Link to="/starships">
                    <button className="btn-category">
                        🚀 Starships
                    </button>
                </Link>
                <Link to="/planets">
                    <button className="btn-category">
                        🪐 Planetas
                    </button>
                </Link>
                <Link to="/species">
                    <button className="btn-category">
                        👽 Especies
                    </button>
                </Link>
                <Link to="/vehicles">
                    <button className="btn-category">
                        🚅 Vehículos
                    </button>
                </Link>
                <Link to="/favorites">
                    <button className="btn-category">
                        ⭐ Favoritos
                    </button>
                </Link>
            </div>
            <Footer />
        </>
    )
}

export default MainPage;