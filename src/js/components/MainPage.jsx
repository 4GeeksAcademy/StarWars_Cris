import React, { useContext, useEffect } from "react";
import { AppContext } from "./AppContexts";
import { Link } from "react-router";

const MainPage = () => {

    return (

        <>
            <div className="d-flex flex-column my-3">
                <Link to={"/characters"}>
                    <button>
                        Characters
                    </button>
                </Link>
                <Link to={"/films"}>
                    <button>
                        Films
                    </button>
                </Link>
                <Link to={"/starships"}>
                    <button>
                        StarShips
                    </button>
                </Link>
            </div>
        </>
    )
}

export default MainPage;