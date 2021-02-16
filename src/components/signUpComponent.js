import React, { useState } from "react"
import { Form, FormGroup, Input,Button } from 'reactstrap';
import {Link} from "react-router-dom"
import {auth} from "../firebase"
import firebase from "firebase"



function SignUpComponent(){

    const [input,setInput] = useState({email:"",password:""})

    const [error,setError] = useState("")


    function handleSignUp(){
        auth().createUserWithEmailAndPassword(input.email, input.password)
        .catch((error)=>{
            console.log(error)
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
        .catch((error) => {
            // Handle Errors here.
           setError(error.message)
            // ...
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
            <h1>Sign Up To <span className="chatty-blue">Chatty</span></h1>
            <p>Fill in the form below to create an account.</p>
            <FormGroup>   
                <Input type="email" name="email" id="exampleEmail" placeholder="Email" value={input.email} onChange={handleChange}/> 
            </FormGroup>
            
            <FormGroup> 
                <Input type="password" name="password" id="examplePassword" placeholder="Password" value={input.password} onChange={handleChange}/>
            </FormGroup>
            {error ? <p className="error">{error}</p> : " "}
            <Link to="/signup"><Button color="primary" className="btn" onClick={handleSignUp}>Sign Up</Button></Link>

            <p>You can also signup with any of these services</p>

            <Button color="danger" className="btn" onClick={googleSignIn}>Sign Up With Google</Button>  <Button color="secondary" className="btn" onClick={githubSignIn}>Sign Up with Github</Button>

            <hr />
            <p>Already have an account ? <Link to="/signin"> Login</Link></p>
            
    </Form>


    </div>)
}

export default SignUpComponent;