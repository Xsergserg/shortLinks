import React, {useContext} from 'react'
import {AuthContext} from "../context/AuthContext";
import {NavLink} from "react-router-dom";

export const Navbar = () => {
    const auth = useContext(AuthContext);
    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
    }

    return (
        <nav>
            <div className="nav-wrapper yellow darken-2">
                <span className="brand-logo left">Make your link shorter</span>
                <ul id="nav-mobile" className="right">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">Links</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Exit</a></li>
                </ul>
            </div>
        </nav>
    )
}