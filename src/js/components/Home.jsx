import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./Navbar";
import Footer from "./Footer";
import MainPage from "./MainPage";
import Characters from "./Characters";
import Films from "./Films";
import StarShips from "./StarShips";

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
			</Routes>
			<Footer />
		</BrowserRouter>
		</>
	);
};

export default Home;