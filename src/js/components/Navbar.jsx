import React from "react";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container-fluid">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1280px-Star_Wars_Logo.svg.png"
                    width="100"
                />

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
                            <a className="nav-link custom-link active" href="#">Personajes</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link custom-link" href="#">NavesLink</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle custom-link"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                            >
                                Peliculas
                            </a>
                            <ul className="dropdown-menu custom-dropdown">
                                <li><a className="dropdown-item" href="#">Pelicula 1</a></li>
                                <li><a className="dropdown-item" href="#">Pelicula 2</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};


export default Navbar;