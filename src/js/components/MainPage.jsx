import React, { useContext, useEffect } from "react";
import { AppContext } from "./AppContexts";
import { Link } from "react-router";

const MainPage = () => {

    return (

        <>
            <div className="btn-group-category">
                <Link to={"/characters"}>
                    <button className="btn-category">
                        Characters
                    </button>
                </Link>
                <Link to={"/films"}>
                    <button className="btn-category">
                        Films
                    </button>
                </Link>
                <Link to={"/starships"}>
                    <button className="btn-category">
                        StarShips
                    </button>
                </Link>
            </div>
        </>
    )
}

export default MainPage;