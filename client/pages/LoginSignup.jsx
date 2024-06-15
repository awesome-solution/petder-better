import React, {useState, useEffect} from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
    // const {state, useState} = useState("Login");
    // const [formData, setFormData] = useState({
    //     "username": "",
    //     "password": "",
    //     "email": "",
    // });

    // const login = async() => {
    //     let responseData;
    //     await fetch("/api/", {
    //         method: "POST",
    //         header:{
    //             Accept: "application/form-data",
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(formData),
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {responseData = data});

    //     if (responseData.success) {
    //         window.location.replace("/profile");
    //     }
    // }

    return (
        <div className="wrapper">
             <div className="form-box">
                <div className="register-container" id="register">
                    <div className="top">
                        <span>Have an account <a>Login</a></span>
                        <header>Sign Up</header>
                    </div>
                    <div className="input-box">
                        <input type="text" className="input-field" placeholder="Your Name"/>
                    </div>
                    <div className="input-box">
                        <input type="text" className="input-field" placeholder="Email"/>
                    </div>
                    <div className="input-box">
                        <input type="text" className="input-field" placeholder="Password"/>
                    </div>
                    <div className="input-box">
                        <input type="submit" className="submit" value="Register"/>
                    </div>
                </div>
            </div>
        </div>
       
    )
}

export default LoginSignup;