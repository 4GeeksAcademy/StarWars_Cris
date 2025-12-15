import React, { useContext, useEffect } from "react";
import { AppProvider } from "./AppContexs";

const MainPage = () => {

    const URL_BASE_API_STAR_WARS = "https://swapi.dev/api/"

    const {
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
    } = useContext(AppProvider)

    const getPersonajes = () =>{
        fetch(`${URL_BASE_API_STAR_WARS}/films/`)
        .then(res => {
            if(!res.ok){
                throw new Error ("No se pudo conseguir los datos de las peliculas")
            }

            console.log("Se consiguió las peliculas: " + res.status)
        })
        .then(data => setPersonaje(data))
        .catch(err => console.error(err))
    }

    return (

        <>

        </>
    )
}

export default MainPage;