import React from "react"
import { act } from "react-dom/test-utils";
import { useState } from "react/cjs/react.development";

 const chatContext = React.createContext();

function ChatContextProvider({children}){

    const [currentUser,setCurrentUser] = useState("");

    const [activeRoom,setActiveRoom]  = useState({roomName:"",roomDesc:"",uid:""});

    const [userArr,setUserArr] = useState([])

    function handleCurrentUser(user){
        setCurrentUser(user)
    }

    function handleActiveRoom(activeroom){
        console.log(activeRoom)
        setActiveRoom(activeroom)
    }

    

    return(
    <chatContext.Provider value={{currentUser,handleCurrentUser,activeRoom,handleActiveRoom,userArr,setUserArr}}>
        {children}
    </chatContext.Provider>)
}

export {chatContext,ChatContextProvider}