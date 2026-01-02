import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./Navbar";
import Footer from "./Footer";
import MainPage from "./MainPage";
import Characters from "./Characters";
import Films from "./Films";
import StarShips from "./StarShips";
import Planets from "./Planets";
import Species from "./Species";
import Vehicles from "./Vehicles";

const Home = () => {
	return (
		<>
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path={"/"} element={<MainPage />} />
				<Route path={"/characters"} element={<Characters />} />
				<Route path={"/films"} element={<Films />} />
				<Route path={"/starships"} element={<StarShips />} />
				<Route path={"/planets"} element={<Planets />} />
				<Route path={"/species"} element={<Species />} />
				<Route path={"/vehicles"} element={<Vehicles />} />
			</Routes>
			<Footer />
		</BrowserRouter>
		</>
	);
};

export default Home;