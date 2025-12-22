import React, { createContext } from "react";
import { useContext, useState, useEffect } from "react";


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [personaje, setPersonaje] = useState([]);
    const [nave, setNave] = useState([]);
    const [pelicula, setPelicula] = useState([]);
    const [planetas, setPlanetas] = useState([]);
    const [especies, setEspecies] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);

    return (
        <AppContext.Provider
            value={{
                personaje,
                setPersonaje,
                nave,
                setNave,
                pelicula,
                setPelicula,
                planetas,
                setPlanetas,
                especies,
                setEspecies,
                vehiculos,
                setVehiculos
            }}
        >
            {children}
        </AppContext.Provider>
    );
};