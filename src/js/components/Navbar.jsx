import React from "react";
import { Link } from "react-router";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg custom-navbar mb-5">
            <div className="container-fluid">
                <Link to={"/"}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1280px-Star_Wars_Logo.svg.png"
                    width="100"
                    />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={"/planets"}>
                            <button className="btn-navbar">
                                Planetas
                            </button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/species"}>
                            <button className="btn-navbar">
                                Especies
                            </button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/vehicles"}>
                            <button className="btn-navbar">
                                Vehículos
                            </button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};


export default Navbar;