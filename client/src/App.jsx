import React from 'react';
import Profile from '../pages/Profile';
import {Route, Routes} from 'react-router-dom';
import Navbar from '../component/Navbar/Navbar';
import LoginSignup from '../pages/LoginSignup';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Favorite from '../pages/Favorite';
import DatingMode from '../pages/DatingMode';


// path to Fav
// path to Search
// Path to Dating Mode
// Path to Profile after finished signup page (Registered button was clicked)
    // and everytime when the profile picture was clicked

    //<DatingMode />
   // <Profile />
const App = () => {
    return (
        <Provider store={store}>
               <Navbar />
               <Profile />
        </Provider>
    )
}
{/* <Navbar />
                    <Routes>
            <Route path="/" element={<LoginSignup />} />
            <Route path="/profile" element={<Profile />}/>
            <Route path='/favorite' element={<Favorite />} />
            <Route path='/dating' element={<DatingMode />} />
            </Routes> */}

export default App;