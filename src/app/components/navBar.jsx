import React from "react";

const NavBar = () => {
    return (
        <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/main">
                    Main
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/login">
                    Login
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/users">
                    Users
                </a>
            </li>
        </ul>
    );
};

export default NavBar;
