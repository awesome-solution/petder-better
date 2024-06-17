import React from "react";
import "./userProfile.css";
import { useSelector } from 'react-redux'; 

const UserProfile = () => {
  const showUserProfile = useSelector(state => state.pets.showUserProfile);
  const userPet = useSelector(state => state.pets.currentPet);

  if (!showUserProfile) {
    return null;
  }

  return (
    <div className="main__userprofile">
      <div className="profile__card user__profile__image">
        <div className="profile__image">
          <img src={userPet.picture} alt={`${userPet.name} profile`} />
        </div>
        <h4 className="name">{userPet.name}</h4>
        <p className="species">{userPet.breed}</p>
      </div>
      <div className="profile__card">
        <h4>Information</h4>
        <div className="card__content">
          <p className="color">Color: {userPet.color}</p>
          <p className="gender">Gender: {userPet.gender}</p>
          <p className="neutering">Neutering: {userPet.neutering}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
