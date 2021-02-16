import React from "react"
import { Form, FormGroup, Input,Button } from 'reactstrap';
import {Link} from "react-router-dom"
import {useState} from "react"
import {auth} from "../firebase"
import firebase from "firebase"



function SignInComponent(){

    const [input,setInput] = useState({email:"",password:""})

    const [error,setError] = useState("")


    function handleSignIn(){
        auth().signInWithEmailAndPassword(input.email, input.password)
        .then((usercredential)=>{
                console.log(usercredential,"here")
        })
        .catch((error)=>{
            setError(error.message)
        })
    }

    function handleChange(e){
        const {name,value} = e.target

        setInput(prevState => ({...prevState,[name]:value}) )
    }

    function googleSignIn(){
        var provider = new firebase.auth.GoogleAuthProvider();
        auth()
        .signInWithPopup(provider)
        .then((result) => {
           
        }).catch((error) => {
            // Handle Errors here.
           setError(error.message)
        });
    }

    function githubSignIn(){
        var provider = new firebase.auth.GithubAuthProvider();
        firebase
        .auth()
        .signInWithPopup(provider)
        .catch((error) => {
            // Handle Errors here.
           setError(error.message)
            // ...
        });

    }



    return(
    <div className="form-container">
    <Form className="form">
            <h1>Login To <span className="chatty-blue">Chatty</span></h1>
            <p>Fill in the form below to login to your account.</p>
            <FormGroup>   
                <Input type="email" name="email" id="exampleEmail" placeholder="Email" value={input.email} onChange={handleChange}/>
            </FormGroup>
            
            <FormGroup> 
                <Input type="password" name="password" id="examplePassword" placeholder="Password" value={input.password} onChange={handleChange} />
            </FormGroup>

            {error ? <p className="error">{error}</p> : ""}
            <Link to="/signin"><Button color="primary" className="btn" onClick={handleSignIn}>Login</Button></Link>

            <p>You can also signup with any of these services</p>

            <Button color="danger" className="btn" onClick={googleSignIn}>Sign In With Google</Button>  <Button color="secondary" className="btn" onClick={githubSignIn}>Sign In with Github</Button>

            <hr />
            <p>Don't have an account ? <Link to="/signup"> Sign Up</Link></p>
            
    </Form>


    </div>)
}

export default SignInComponent;