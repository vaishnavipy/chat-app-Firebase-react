import React, { useContext } from "react"
import { useEffect, useState } from "react/cjs/react.development"
import {chatContext} from "../chatContext"
import {database} from "../firebase"
import getInitials from "../helpers.js/getInitials";
import ScrollToBottom,{useScrollToBottom} from 'react-scroll-to-bottom';
import Moment from 'react-moment';
import { act } from "react-dom/test-utils";

function Chats(){

    const {activeRoom,currentUser,userArr} = useContext(chatContext)

    const [chatInput,setChatInput] = useState("")

    const [chatArr,setChatArr] = useState([])

    

    function handleChat(e){
        setChatInput(e.target.value)
    }

    function handleSendChat(e){
        if(e.keyCode === 13){
         var newChat=   database.ref("chats").push()
        newChat.set({
            userName :currentUser.displayName ,
            uid : currentUser.uid,
            roomName : activeRoom.roomName,
            roomDesc : activeRoom.roomDesc,
            message : chatInput,
            timeStamp: Date.now()
        }) 

        setChatInput("")
        }
       
    }

    useEffect(()=>{
        database.ref("chats").on("value",(snapshot) => {
            setChatArr([])
            snapshot.forEach((snap) => {
                setChatArr(prevState =>  [...prevState,snap.val()])
            })

        })

      
      
    },[])

    

   
    useEffect(()=>{
        console.log(chatArr,"hi")
       
    },[chatArr])

   const roomChats = chatArr.filter(rooms => rooms.roomName === activeRoom.roomName).map(elm => {

       let bgcolor = elm.uid === "chat-bot" ? "skyblue" : userArr.find(user => user.uid === elm.uid).setColor;
       console.log(userArr.find(user => user.uid === elm.uid),"found")
       return(
       <div className="chat-msg-div">
           <span className="initials" style={{backgroundColor:bgcolor}}>{getInitials(elm.userName)}</span><h5>{elm.userName}<span className="time-stamp"> at <Moment format="MM/DD/YYYY hh:mm a">{elm.timeStamp}</Moment></span></h5>
           <span></span><div><p className="left">{elm.message}</p></div>
       </div>)
   })

    return(
        <div className="chats-container">
            <div className="chat-room-title">
                <h5>{activeRoom.roomName}</h5>
                <p className="room-summary">{activeRoom.roomDesc}</p>
                <hr />
            </div>

             <ScrollToBottom className="room-chats-div" mode="bottom"  sticky={true}>
               
                    {roomChats}
            </ScrollToBottom>
         
           
            <div className="send-chat-bar">
                <input type="text" value={chatInput} onChange={handleChat} placeholder="Type your message here.." onKeyDown={handleSendChat}/>
            </div>
        </div>
        )
}

export default Chats;