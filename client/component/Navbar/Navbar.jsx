import "./Navbar.css";
import React from "react";
import logo from "../../public/icon.png";
import { useSelector, useDispatch } from "react-redux";
import { setAuthView, logout } from "../../src/Redux/action";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  //when we click on log out button, the state will be change to logout
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/"); // Navigate to home page after logout
  };

  return (
    <nav className="nav">
      <Link to ="/profile">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
      </div>
      </Link>
      <div className="nav-menu">
        <ul>
          <li>
            <Link to="/favorite" className="link">
              Favorite
            </Link>
          </li>
          <li>
            <Link to="/search" className="link">
              Search
            </Link>
          </li>
          <li>
            <Link to="/datingmode" className="link">
              Dating Mode
            </Link>
          </li>
        </ul>
      </div>

      {user ? (
        // If user is logged in, show Log Out button
        <div className="nav-button">
          <button className="btn" id="logOutBtn" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      ) : (
        // If user is not logged in, show Login and Sign Up buttons
        <div className="nav-button">
          <button
            className="btn"
            id="loginBtn"
            onClick={() => {
              dispatch(setAuthView("Login"));
              navigate("/");
            }}
          >
            Login
          </button>
          <button
            className="btn"
            id="signBtn"
            onClick={() => {
              dispatch(setAuthView("SignUp"));
              navigate("/");
            }}
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
