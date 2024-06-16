import './Navbar.css';
import React from 'react';
import logo from "../../public/icon.png";
import { useSelector, useDispatch } from 'react-redux'; 
import { setAuthView, logout } from '../../src/Redux/action';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const dispatch = useDispatch();
    const authView = useSelector(state => state.auth.authView);
    
    //when we click on log out button, the state will be change to logout
    const handleLogOut = () => {
        dispatch({type: 'LOGOUT'});
    }
    return (
        <nav className="nav">
            <div className="nav-logo">
                <img src={logo} alt="logo"/>
            </div>
            <div className="nav-menu">
                <ul>
                    <li><Link to="/favorite" className="link">Favorite</Link></li>
                    <li><Link to="/search" className="link">Search</Link></li>
                    <li><Link to="/Dating" className="link">Dating Mode</Link></li>
                </ul>
            </div>
            
            {authView === 'LogOut'? (
                //if we already loggedIn, authView will change to be LogOut
                <div className="nav-button">
                <button className="btn" id="logOutBtn" onClick={handleLogOut}>Log Out</button>
                </div>
            ):(
                <div className="nav-button">
                <button className="btn" id="loginBtn" onClick={() => dispatch(setAuthView('Login'))}>Login</button>
                <button className="btn" id="signBtn" onClick={() => dispatch(setAuthView('SignUp'))}>Sign Up</button>
                </div>
            )}
            
        </nav>
    )
}

export default Navbar;