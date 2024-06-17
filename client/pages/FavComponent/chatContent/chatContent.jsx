import React, { useState, createRef, useEffect } from "react";
import "./chatContent.css";
import ChatItem from "./chatItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";

const ChatContent = () => {
  const currentMessages = useSelector(state => state.pets.currentMessages);
  const currPet = useSelector(state => state.pets.currentPet);
  const user = useSelector(state => state.auth.user);
  const showChatContent = useSelector(state => state.pets.showChatContent);

    return (
    <div className="main__chatcontent">
      <div className="content__header">
        <p>{currPet.name}</p>
      </div>

      {showChatContent? (
        currentMessages.map((itm, index) => {
          return (
            <div className="content__body" key={index}>
              <div className="chat__items">
                <ChatItem
                  animationDelay={index + 2}
                  user={itm.from_user_id === user.userId ? "me": "other"}
                  msg={itm.msg}
                  image={itm.from_user_id === user.userID ? user.picture: currPet.picture}
                />
              </div>
            </div>
          );})
      ):(<div></div>)}
      
         
      <div className="content__footer">
        <div className="sendNewMessage">
          <FontAwesomeIcon className="icon" icon={faPaperclip} />
          <input
            type="text"
            placeholder="Type a message here"
          //   onChange={}
          //   value={this.state.msg}
          />
          <button className="btnSendMsg" id="sendMsgBtn">
          <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
    );
}

export default ChatContent;
