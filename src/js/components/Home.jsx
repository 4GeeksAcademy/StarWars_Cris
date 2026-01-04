import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

/*Componentes principales*/
import Navbar from "./Navbar";
import MainPage from "./MainPage";
import Characters from "./Characters";
import Films from "./Films";
import StarShips from "./StarShips";
import Planets from "./Planets";
import Species from "./Species";
import Vehicles from "./Vehicles";

/*Componentes de detalles*/
import VehiclesDetails from "./ComponentDetails/VehiclesDetails";
import CharacterDetails from "./ComponentDetails/CharactersDetails";
import FilmDetails from "./ComponentDetails/FilmDetails";
import StarshipsDetails from "./ComponentDetails/StarshipsDetails";
import PlanetsDetails from "./ComponentDetails/PlanetsDetails";
import SpecieDetails from "./ComponentDetails/Species";

/*Vídeo del Background*/
import VideoBackground from "./VideoBackground";

const Home = () => {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					{/*Compontentes Principales*/}
					<Route path={"/"} element={<MainPage />} />
					<Route path={"/characters"} element={<Characters />} />
					<Route path={"/films"} element={<Films />} />
					<Route path={"/starships"} element={<StarShips />} />
					<Route path={"/planets"} element={<Planets />} />
					<Route path={"/species"} element={<Species />} />
					<Route path={"/vehicles"} element={<Vehicles />} />

					{/*Compontentes de Detalles*/}
					<Route path={"/characters/details/:id"} element={<CharacterDetails />} />
					<Route path={"/films/details/:id"} element={<FilmDetails />} />
					<Route path={"/starships/details/:id"} element={<StarshipsDetails />} />
					<Route path={"/planets/details/:id"} element={<PlanetsDetails />} />
					<Route path={"/species/details/:id"} element={<SpecieDetails />} />
					<Route path={"/vehicles/details/:id"} element={<VehiclesDetails />} />
				</Routes>
				<VideoBackground />
			</BrowserRouter>
		</>
	);
};

export default Home;