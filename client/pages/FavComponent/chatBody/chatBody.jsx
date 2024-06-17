import React, {Component} from 'react';
import "./chatBody.css";
import FavList from '../favList/favList';
import ChatContent from '../chatContent/chatContent';
import UserProfile from '../userProfile/userProfile';

const ChatBody = () => {
    return (
        <div className="main_chatbody">
            <FavList />
            {/* <ChatContent />
            <UserProfile /> */}
        </div>
    )
}

export default ChatBody;