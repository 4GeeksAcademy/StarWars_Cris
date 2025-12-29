import React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContexts";

const Characters = () =>{

    const URL_BASIC_API = 'https://www.swapi.tech/api/'

    const {
        personaje,
        setPersonaje,
    } = useContext(AppContext)


    const getCharacters = () => {
        fetch(`${URL_BASIC_API}people/`)
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
        if(personaje.length === 0){
            getCharacters();
        }
    }, [])

    return(
        <>
        <div className="container">
            <div className="row">
                    <h1>Personajes</h1>
                    {personaje && personaje.map(char => (
                        <div key={char.uid} className="card col-md-6 col-xl-4 col-sm-12 my-3">
                            <div className="card-title mb-3">
                                <img src={"https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/" + char.uid + ".jpg"} className="card-img-top" alt={char.name}></img>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title">{char.name}</h1>
                                <a href="#" className="btn btn-primary">Ver Más</a>
                            </div>
                        </div>
                    ))}
                    {!personaje && 
                    <h1>OOppssss No hay persoanjes ahora mismo registrados</h1>}
            </div>
        </div>
        </>
    )
}

export default Characters;