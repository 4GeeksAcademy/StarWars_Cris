import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./Navbar";
import Footer from "./Footer";
import MainPage from "./MainPage";

const Home = () => {
	return (
		<>
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path={"/"} element={<MainPage />} />
			</Routes>
			<Footer />
		</BrowserRouter>
		</>
	);
};

export default Home;