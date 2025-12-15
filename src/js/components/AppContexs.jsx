import React, { createContext } from "react";
import { useContext, useState, useEffect } from "react";


const AppContext = createContext();


export const AppProvider = ({ children }) => {
    const [personaje, setPersonaje] = useState(null);
    const [nave, setNave] = useState(null);
    const [pelicula, setPelicula] = useState(null);
    const [planetas, setPlanetas] = useState(null);
    const [especies, setEspecies] = useState(null);
    const [vehiculos, setVehiculos] = useState(null);

    return (
        <AppProvider.Provider value={{
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
        }}>
            {children}

        </AppProvider.Provider>
    )
}