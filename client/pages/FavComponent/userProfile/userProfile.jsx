import React from "react";
import "./userProfile.css";
import { useSelector } from 'react-redux'; 
import test1 from '../../../public/test1.png';

const UserProfile = () => {
  const userProfile = useSelector(state => state.pets.pets);
    return (
      <div className="main__userprofile">
        <div className="profile__card user__profile__image">
          <div className="profile__image">
            <img src={test1} />
          </div>
          <h4 className="name">Toffee</h4>
          <p className="species">Mini Aussie</p>
          <p className="location">San Jose</p>
        </div>
        <div className="profile__card">
          <h4>Information</h4>
          <div className="card__content">
            <p className="username">UserName: Aria</p>
          </div>
        </div>
      </div>
    );
  }

export default UserProfile