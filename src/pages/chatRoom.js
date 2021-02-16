import React,{useState} from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import RoomList from "../components/roomList"
import Chats from "../components/chats"


function ChatRoom({signOut}){

   
    return(
    <div className="main-container">
        <Header signOut={signOut}/>
            <div className="chat-room">
                <RoomList />
                <Chats />
            </div>
      
         
    </div>)    
}

export default ChatRoom