import React from "react"
import { Button } from 'reactstrap';
import {Link} from "react-router-dom"

function HomeContent(){
    return( 
    <div className="home">
        <div>
          <h1 className="display-3">Welcome to Chatty!</h1>
          <h3 className="lead">A great place to share your thoughts wiht your friends</h3>
          <hr className="my-2" />
        
          <p className="lead">
          <Link to="/signup"> <Button color="primary" className="btn">Create New Account</Button></Link>
          <Link to="/signin">  <Button color="primary" className="btn">Login to Your Account</Button></Link>
          </p>
       </div>
      </div>)
}

export default HomeContent