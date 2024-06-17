import React, { useState, createRef, useEffect } from "react";
import test1 from '../../../public/test1.png';
import test2 from '../../../public/test2.png';
import "./chatContent.css";
import ChatItem from "./chatItem";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
// import { useSelector } from "react-redux";

const ChatContent = () => {
  const showChatContent = useSelector(state => state.pets.showChatContent);
  const currPet = useSelector(state => state.pets.pets);
  const user = useSelector(state => state.auth.user);
  // const chatItms = [
  //   {
  //     key: 1,
  //     image: test1,
  //     type: "",
  //     msg: "Hi Tim, How are you?",
  //   },
  //   {
  //     key: 2,
  //     image: test2,
  //     type: "other",
  //     msg: "I am fine.",
  //   },
  //   {
  //     key: 3,
  //     image: test1,
  //     type: "",
  //     msg: "What about you?",
  //   },
  //   {
  //     key: 4,
  //     image: test2,
  //     type: "other",
  //     msg: "Awesome these days.",
  //   },
  //   {
  //     key: 5,
  //     image: test1,
  //     type: "",
  //     msg: "Finally. What's the plan?",
  //   },
  //   {
  //     key: 6,
  //     image: test2,
  //     type: "other",
  //     msg: "what plan mate?",
  //   },
  //   {
  //     key: 7,
  //     image: test1,
  //     type: "",
  //     msg: "I'm taliking about the tutorial",
  //   },
  // ];

    return (
    <div className="main__chatcontent">
        <div className="content__header">
            <div className="blocks">
                <div className="current-chatting-user">
                <p>Tim</p>
                </div>
            </div>
        </div>

            {showChatContent.map((itm, index) => {
              return (
              <div>
                <div className="content__header">
                  <div className="blocks">
                      <div className="current-chatting-user">
                      <p>currPet.name</p>
                      </div>
                  </div>
                </div>
    
                <div className="content__body">
                  <div className="chat__items">
                    <ChatItem
                      animationDelay={index + 2}
                      user={itm.sender_id === user.userid ? "me": "other"}
                      msg={itm.msg}
                      image={itm.sender_id === user.userid ? user.picture: currPet.picture}
                    />
                  </div>
                </div>
              </div>
              );})
            };
         
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
