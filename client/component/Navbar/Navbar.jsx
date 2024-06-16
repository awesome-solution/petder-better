import './Navbar.css';
import React from 'react';
import logo from "../../public/icon.png";



const Navbar = () => {
    return (
        <nav className="nav">
            <div className="nav-logo">
                <img src={logo} alt="logo"/>
            </div>
            <div className="nav-menu">
                <ul>
                    <li><a href="/favorite" className="link">Favorite</a></li>
                    <li><a href="/search" className="link">Search</a></li>
                    <li><a href="/Dating" className="link">Dating Mode</a></li>
                </ul>
            </div>
            <div className="nav-button">
                <button className="btn" id="loginBtn">Login In</button>
                <button className="btn" id="signBtn">Sign Up</button>
            </div>
        </nav>
    )
}

export default Navbar;