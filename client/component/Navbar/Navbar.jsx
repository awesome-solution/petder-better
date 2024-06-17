import './Navbar.css';
import React from 'react';
import logo from '../../public/icon.png';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthView, logout } from '../../src/Redux/action';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);  // Assuming this is the state to check if logged in

  const handleLogOut = () => {
    dispatch(logout()); // Dispatch a logout action
  };

  return (
    <nav className="nav">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="nav-menu">
        <ul>
          <li>
            <Link to="/favorite" className="link">
              Favorite
            </Link>
          </li>
          <li>
            <Link to="/profile" className="link">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/dating" className="link">
              Dating Mode
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/profile" className="link">
                Profile
              </Link>
            </li>
          )}
        </ul>
      </div>
      {isLoggedIn ? (
        <div className="nav-button">
          <button className="btn" id="logOutBtn" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      ) : (
        <div className="nav-button">
          <button className="btn" id="loginBtn" onClick={() => dispatch(setAuthView('Login'))}>
            Login
          </button>
          <button className="btn" id="signBtn" onClick={() => dispatch(setAuthView('SignUp'))}>
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
