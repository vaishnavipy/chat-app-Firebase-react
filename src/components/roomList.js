import React,{useContext, useState} from "react"
import { useEffect } from "react/cjs/react.development";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,FormGroup,Input,Label } from 'reactstrap';
import {database} from "../firebase"
import {chatContext} from "../chatContext"
import getInitials from "../helpers.js/getInitials"



function RoomList(){

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const [roomInput,setRoomInput] = useState({roomname:"",desc:""})

    const {currentUser,activeRoom,handleActiveRoom,userArr} = useContext(chatContext)

    const [roomArr,setRoomArr] = useState([])

    const [error,setError] = useState("")

  

    function handleChange(e){
        const {name,value} = e.target
        setRoomInput(prevState => ({...prevState,[name]:value}) )
    }

    function handleAddRoom(){
        setError("");

        if(roomArr.length !== 0){
           if(!roomArr.map(roomObj => roomObj.roomName).includes(roomInput.roomname) ){

            var newRoomRef =  database.ref("rooms").push();
            newRoomRef.set({
                roomName : roomInput.roomname,
                roomDesc : roomInput.desc,
                uid : currentUser.uid
            })

            var newChatRef = database.ref("chats").push();
            newChatRef.set({
                userName : "Chat Bot",
                uid : "chat-bot",
                roomName : roomInput.roomname,
                roomDesc : roomInput.desc,
                message : "Welcome to React Chat App. 👋 Send a message now to start interacting with other users in the app.",
                timeStamp: Date.now()
            })
            setRoomInput({roomname:"",desc:""})
            setModal(prevState => !prevState)
            setError("")

           }else{
            setRoomInput({roomname:"",desc:""})
            setError("Room Name Already Exists,Choose a Different Name..")
           }
        }else{

            var newRoomRef =  database.ref("rooms").push();
            newRoomRef.set({
                roomName : roomInput.roomname,
                roomDesc : roomInput.desc,
                uid : currentUser.uid
            })

            var newChatRef = database.ref("chats").push();
            newChatRef.set({
                userName : "Chat Bot",
                uid : "chat-bot",
                roomName : roomInput.roomname,
                roomDesc : roomInput.desc,
                message : "Welcome to React Chat App. 👋 Send a message now to start interacting with other users in the app.",
                timeStamp: Date.now()
            })
            setRoomInput({roomname:"",desc:""})
            setModal(prevState => !prevState)
            setError("")


        }
        
    }



    useEffect(()=>{

        database.ref("rooms").on("value",(snapshot) => {
            setRoomArr([])
            snapshot.forEach((snap)=> {
                    
                setRoomArr( prevState => [...prevState,snap.val()])
              

            })

        })

      

    },[])



    useEffect(()=>{

        if(roomArr.length !== 0){
            handleActiveRoom(roomArr[roomArr.length-1])
        }

    },[roomArr])

    function chooseActiveRoom(e){
        let tempActiveRoom = roomArr.filter(roomObj => roomObj.roomName === e.target.id)
        handleActiveRoom(tempActiveRoom[0])
    }
   
   const roomsList = roomArr.map(roomObj =>  <p className={roomObj.roomName === activeRoom.roomName ? "room-name active-room" : "room-name"} onClick={chooseActiveRoom} id={roomObj.roomName}> #  {roomObj.roomName}</p> )

   

    return(
        <div className="room-list">

            <div className="user">
                <span className="initials" >{getInitials(currentUser.displayName)}</span>
                <div>
                    <h4>{currentUser.displayName}</h4>
                    <p>Health Coach</p>
                </div>
            </div>

            <div className="your-rooms">

                <div className="your-rooms-flex">
                    <p>Your Rooms</p> 
                    <div>
                        <p className="add-room" onClick={toggle}>➕</p>
                    
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle}>Create Your Own Room</ModalHeader>
                            <ModalBody >
                                <FormGroup>
                                    <Label for="roomNameinput">Room Name :</Label>
                                    <Input type="text"  id="roomNameinput" name="roomname" value={roomInput.roomname} onChange={handleChange} />
                                    {error ? <p className="error">{error}</p> : ""}
                                </FormGroup>

                                <FormGroup>
                                    <Label for="roomDescinput">Description :</Label>
                                    <Input type="text"  id="roomDescinput"  name="desc" value={roomInput.desc} onChange={handleChange} />
                                  
                                </FormGroup>
             
                               
                            </ModalBody>
                            <ModalFooter>
                            <Button color="primary" onClick={handleAddRoom}>Add Room</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
            
                   
                </div>

                <div className="rooms">
                    {roomsList}
                </div>
               

            </div>
           
           
        </div>
        )
}

export default RoomList;