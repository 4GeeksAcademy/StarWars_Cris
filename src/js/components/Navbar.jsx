import React from "react";
import { Link } from "react-router";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg custom-navbar mb-2 navbar-element">
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
                <h1>Frikipedia</h1>
            </div>
        </nav>
    );
};


export default Navbar;