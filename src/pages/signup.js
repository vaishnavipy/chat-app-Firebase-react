import React from "react"
import Footer from "../components/footer"
import SignUpComponent from "../components/signUpComponent"
import Header from "../components/header"



function SignUp(){
    return(
    <div className="main-container">
        <Header />
           <SignUpComponent />
        <Footer />
    </div>)
}

export default SignUp;