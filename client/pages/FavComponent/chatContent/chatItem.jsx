import React from "react";
import './chatItem.css'


const ChatItem = ({msg, user, image}) => {

    return (
        <div
            style={{ animationDelay: `0.1s` }}
            className={`chat__item ${user ? user : ""}`}
        >   
        {user === "me"? (
        <div className= "me">
            <img src={image} alt="User" className="User" />
            <div className="chat__item__me">
                <p className="me_message">{msg}</p>
            </div>
        </div>
        ):(
        <div className="other">
            <div className="chat__item__content">
                <p className="other_message">{msg}</p>
            </div>
            <img src={image} alt="User" className="User" />
        </div>
        )}
        </div>
    );
}

export default ChatItem;
