import React, {useState, useEffect} from 'react';
import "./CSS/Favorite.css";
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import FavList  from './FavComponent/favList/favList';
import ChatContent from './FavComponent/chatContent/chatContent';
import UserProfile from './FavComponent/userProfile/userProfile';
function Favorite() {
    const location = useLocation();
    const userId = useSelector(state => state.auth.user.userID)  //Make sure the name is userID
    const [favPets, setFavPets] = useState([]);
    
    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:3000/favorite?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                setFavPets(data);
            })
            .catch(error => {
                console.log('Error fetching favorite pets:', error);
            });
        }
    },[userId, location]);


    return (
    <div className="__main">
        <FavList favPets={favPets}/>
        <ChatContent />
        <UserProfile />
    </div>);
}

export default Favorite;