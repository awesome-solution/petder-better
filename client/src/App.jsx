import React from 'react';
import Profile from '../pages/Profile';
import {Route, Routes} from 'react-router-dom';
import Navbar from '../component/Navbar/Navbar';
import LoginSignup from '../pages/LoginSignup';

const App = () => {
    return (
        <div>
            <Navbar />
            <Profile />
        </div>
    )
}
{/* <Navbar />
            <Routes>
                <Route path="/" element={<LoginSignup />}/>
            </Routes> */}

export default App;