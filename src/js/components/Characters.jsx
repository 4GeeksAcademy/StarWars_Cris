import React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContexts";

const Characters = () =>{

    const URL_BASIC_API = 'https://www.swapi.tech/api/'

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
    } = useContext(AppContext)


    const getCharacters = () => {
        fetch(`${URL_BASIC_API}people`)
        .then(res => {
            if(!res.ok){
                throw new Error('No se pudo conseguir los personajes')
            }
            return res.json();
        })
        .then(data => setPersonaje(data.results))
        .catch(err => console.log(err))
    }
    useEffect(()=>{
        getCharacters();
    }, [])

    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Personajes</h1>
                    {personaje && personaje.map(char => (
                        <div key={char.uid} className="col-md-3">
                            <div className="card mb-3">
                                <img src={"https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/" + char.uid + ".jpg"} className="card-img-top" alt={char.name}></img>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{char.name}</h5>
                                <a href="#" className="btn btn-primary">Ver Más</a>
                            </div>
                        </div>
                    ))}
                    {!personaje && 
                    <h1>OOppssss No hay persoanjes ahora mismo registrados</h1>}
                </div>
            </div>
        </div>
        </>
    )
}

export default Characters;