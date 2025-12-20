import React, { useContext, useEffect } from "react";
import { AppContext } from "./AppContexts";
import { Link } from "react-router";
import Characters from "./Characters";

const MainPage = () => {

    return (

        <>
            <Characters />
        </>
    )
}

export default MainPage;