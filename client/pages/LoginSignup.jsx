import React, {useState, useEffect} from 'react';
import './CSS/LoginSignup.css';
import { useSelector, useDispatch } from 'react-redux'; 
import { setAuthView, loginSuccess, signupSuccess } from '../src/Redux/action';


const LoginSignup = () => {
    const dispatch = useDispatch();

    //get current auth view: "Login or SignUp"
    const authView = useSelector(state => state.auth.authView);

    // recording state of error
    const [error, setError] = useState('');
    // recording formData that will send to server
    const [formData, setFormData] = useState({
        "username": "",
        "password": "",
        "email": "",
    });

    const changeHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    // login
    const login = async() => {
        let responseData;
        console.log('formData', formData);
        await fetch('http://localhost:3000/api/login', {
            method: "POST",
            headers:{
                Accept: "application/form-data",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {responseData = data})
        .catch(err => {
            setError('Login failed. Please try again.');  // Handle fetch error
        });

        if (responseData.success) {
            window.location.replace("/profile");
            dispatch(setAuthView(loginSuccess));
        } else {
            setError('Invalid username or password.');  // Handle response error
        }
    } 

    // signup
    const Signup = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok'); // Throws an error if response is not OK
            }
    
            const responseData = await response.json();
            if (responseData.success) {
                window.location.replace("/profile");
                dispatch(setAuthView(signupSuccess));
            } else {
                setError('Failed to create an account. Please check your details and try again.');
            }
        } catch (error) {
            console.error('Signup Error:', error);
            setError('Signup failed. Please try again.');
        }
    }

    return (
        <div className="wrapper">
             <div className="form-box">
                <div className="register-container" id="register">
                        { authView == "SignUp"? (
                        <div className="top">
                            <div className="oneLine">
                                <p>Already Have an account</p>
                                <span onClick={()=>{dispatch(setAuthView("Login"))}}>Login</span>
                            </div>
                            <header>Sign Up</header>
                        </div>
                        ):(<div className="top">
                        <div className="oneLine">
                            <p>Create a new Account</p>
                            <span onClick={()=>{dispatch(setAuthView("SignUp"))}}>Sign Up</span>
                        </div>
                        <header>Login</header>
                        </div>)}
                        
                    <div className="input-box">
                        <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Your Name" 
                        name="username"
                        value={formData.username} 
                        onChange={changeHandler}/>
                    </div>
                    {authView == "SignUp"?(
                        <div className="input-box">
                        <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Email"
                        name="email"
                        value={formData.email} 
                        onChange={changeHandler}/>
                    </div>
                    ):(<></>)}
                    <div className="input-box">
                        <input type="text" 
                        className="input-field" 
                        placeholder="Password"
                        name="password"
                        value={formData.password} 
                        onChange={changeHandler}/>
                    </div>
                    {error && (
                    <div className="error-message" style={{ color: 'red' }}>
                        {error}
                    </div>
                    )}

                    <button className="input-box" id="submit" onClick={() => {
                        authView == "SignUp" ? Signup() : login();
                    }}>Continue</button>

                    <div className="loginsignup-agree">
                        <input type="checkbox" name="" id="" />
                        <p>By Continuing, I agree to the terms of the use & privacy policy</p>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default LoginSignup;