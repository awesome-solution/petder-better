import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { setCurrentPet, fetchMessages, toggleChatContentVisibility, toggleUserProfileVisibility } from "../../../src/Redux/action";
import './favListItems.css';

const FavListItems = ({name, species, image, animationDelay, pet, userId}) => {
  const dispatch = useDispatch();

  const handleImageClick = () => {
      dispatch(setCurrentPet(pet));
      dispatch(toggleUserProfileVisibility());
  };

  const handleMessageClick = () => {
      dispatch(fetchMessages(userId));
      dispatch(toggleChatContentVisibility());
  };

  return (
    <div
      style={{ animationDelay: `0.${animationDelay}s` }}
      className="chatlist__item"
    >
      <img className="image" src={image ? image : "non-image"} onClick={handleImageClick}/>

      <div className="userMeta">
        <p>{name}</p>
        <span className="species">{species}</span>
      </div>
      <FontAwesomeIcon className="message" icon={faComment} style={{ fontSize: '36px' }} onClick={handleMessageClick}/>
    </div>
  );
}

export default FavListItems;