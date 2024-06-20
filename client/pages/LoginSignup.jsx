import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import { useSelector, useDispatch } from "react-redux";
import { setAuthView, authSuccess } from "../src/Redux/action";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


const LoginSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get current auth view: "Login or SignUp"
  const authView = useSelector((state) => state.auth.authView);

  // Test Redux state change
  const authState = useSelector((state) => state.auth);
  console.log("Current auth state:", authState);

  // recording state of error
  const [error, setError] = useState("");
  // recording formData that will send to server
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // login
  const login = async () => {
    setError('');
    let responseData;
    console.log("formData", formData);
    await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        responseData = data;
      })
      .catch((err) => {
        setError("Login failed. Please try again."); // Handle fetch error
      });

    console.log("Login response data:", responseData); // Log the response data

    console.log("responseData", responseData)
    if (responseData.success) {
      dispatch(authSuccess(responseData.data));
      navigate("/Dating");
    } else {
      setError("Invalid username or password."); // Handle response error
    }
  };

  // signup
  const Signup = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok"); // Throws an error if response is not OK
      }

      const responseData = await response.json();
      console.log("Login response data:", responseData); // Log the response data

      if (responseData.success) {
        dispatch(authSuccess(responseData.data));
        navigate("/profile");
      } else {
        setError(
          "Failed to create an account. Please check your details and try again."
        );
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setError("Signup failed. Please try again.");
    }
  };


//oauth logic
// oAuth client_id: Ov23li7PMcw4dGNJZtDW
//oAuth client secret: 5fa735bb874d774ccb7b403739a96032f4ef5664
// const oauthLogin = async () => {

//  axios.get('http://localhost:3000/api/oauth')
//  .then ((data) => console.log (data))
//  .catch (console.error(error))

// }

const oauthLogin = () => {
  const client_id = 'Ov23li7PMcw4dGNJZtDW';
  const redirect_uri = 'http://127.0.0.1:3000/api/oauth/token';
  const state = '1234567891234567';
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=`
   window.location.assign("https://github.com/login/oauth/authorize?client_id=" + client_id);
}
// https://github.com/login/oauth/authorize?client_id=${client_id}&response_type=code&scope=repo&redirect_uri=${window.location.origin}/integrations/github/oauth2/callback&state=${state}`

// https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fapi%2Foauth%2Ftoken from error message

// https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state} from website

// https://github.com/login/oauth/authorize from github docs

// https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user from feathery

// https://github.com/login/oauth/authorize?client_id=0v23li7PMcw4dGNJZtDW&redirect_uri=http://127.0.0.1:3000/api/oauth/token&scope=user


  return (
        <div className="wrapper">
    <div className="form-box">
      <div className="register-container" id="register">
        {authView === "SignUp" ? (
          <div className="top">
            <div className="oneLine">
              <p>Already have an account?</p>
              <span onClick={() => oauthLogin()}>OAuth</span>
              <span onClick={() => dispatch(setAuthView("Login"))}>Login</span>
            </div>
            <header>Sign Up</header>
          </div>
        ) : (
          <div className="top">
            <div className="oneLine">
              <p>Create a new Account</p>
              <span onClick={() => oauthLogin()}>OAuth</span>
              <span onClick={() => dispatch(setAuthView("SignUp"))}>Sign Up</span>
            </div>
            <header>Login</header>
          </div>
        )}
        
        {/* Form fields */}
        <input type="text" className="input-field" placeholder="Your Name" name="username" value={formData.username} onChange={changeHandler} />
        {authView === "SignUp" && (
          <input type="email" className="input-field" placeholder="Email" name="email" value={formData.email} onChange={changeHandler} />
        )}
        <input type="password" className="input-field" placeholder="Password" name="password" value={formData.password} onChange={changeHandler} />
        
        {/* Error message display */}
        {error && <div className="error-message">{error}</div>}
        
        {/* Form submission button */}
        <button className="input-box" id="submit" onClick={() => { authView === "SignUp" ? Signup() : login(); }}>Continue</button>
        
        {/* Checkbox for terms and conditions */}
        <div className="loginsignup-agree">
          <input type="checkbox" id="termsCheckbox" />
          <label htmlFor="termsCheckbox">By Continuing, I agree to the terms of the use & privacy policy</label>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default LoginSignup;