
import './App.css';
import Home from "./pages/home"
import {Switch,Route, useHistory} from "react-router-dom"
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import PublicRoute from "./components/publicRoute"
import { useState,useEffect, useContext } from 'react';
import ChatRoom from "./pages/chatRoom"
import {auth, database} from  "./firebase";
import {chatContext} from "./chatContext";
import generateRandomColor from "./helpers.js/generateRandomColor"

function App() {

  const [authenticated,setAuthenticated] = useState(false)

  const {handleCurrentUser,setUserArr} = useContext(chatContext)

  const history = useHistory();

  

  useEffect(()=>{
    auth().onAuthStateChanged((user) => {

      if(user){
        handleCurrentUser(user)

        database.ref("users/"+ user.uid ).on("value",(snapshot)=> 
          {  if(!snapshot.exists()){

            var newUser = database.ref("users/"+ user.uid );
            newUser.set({
              uid : user.uid,
              userName : user.displayName,
              userEmail : user.email,
              setColor: `#${generateRandomColor()}` 
            })
            
          }} 
        )

      
        setAuthenticated(true)
        
      }else{
      
        setAuthenticated(false)
      }

    })


    database.ref("users").on("value",(snapshot) => {
      setUserArr([])
      snapshot.forEach((snap) => {
          setUserArr(prevState => [...prevState,snap.val()])
      })
    })



  },[])

  

  function signOut(){
    auth().signOut().then(() => {
      // Sign-out successful.
      setAuthenticated(false)
    }).catch((error) => {
     console.log(error)
    });
    
  }

  useEffect(()=>{
    if(authenticated){
      history.push("/chatroom")
    }else{
      console.log(authenticated,"signput")
      history.push("/signin")
    }
  },[authenticated]) 



  return (
    <div >
      
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/chatroom"><ChatRoom signOut={signOut}/></Route>
        <PublicRoute  path="/signup" authenticated={authenticated} component={SignUp}></PublicRoute>
        <PublicRoute  path="/signin" authenticated={authenticated} component={SignIn}></PublicRoute>

      </Switch>
    </div>  
  );
}

export default App;
