import React from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import SignInComponent from "../components/signInComponent"


function SignIn(){
    return(
    <div className="main-container">
        <Header />
       <SignInComponent />
        <Footer />
    </div>)
}

export default SignIn;