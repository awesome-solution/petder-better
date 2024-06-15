import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Navbar from '../component/Navbar/Navbar';
import LoginSignup from '../pages/LoginSignup';

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<LoginSignup />}/>
            </Routes>
        </div>
    )
}

export default App;