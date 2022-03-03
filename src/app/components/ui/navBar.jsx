import React from "react";
import { Link } from "react-router-dom";
import NavProfile from "./navProfile";
import { useSelector } from "react-redux";
import { getAuthUser, getIsLogged } from "../../store/users";

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLogged());
    const currentUser = useSelector(getAuthUser());

    return (
        <nav className="navbar">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link " aria-current="page" to="/">
                            Main
                        </Link>
                    </li>
                    {isLoggedIn && currentUser && (
                        <li className="nav-item">
                            <Link
                                className="nav-link "
                                aria-current="page"
                                to="/users"
                            >
                                Users
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {isLoggedIn && currentUser ? (
                        <NavProfile currentUser={currentUser} />
                    ) : (
                        <Link
                            className="nav-link "
                            aria-current="page"
                            to="/login"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
