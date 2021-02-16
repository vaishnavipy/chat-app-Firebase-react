import React from "react"
import {Redirect, Route} from "react-router-dom"


function PublicRoute({component:Component,authenticated,...rest}){
    return(
    <Route 
        {...rest}
        render = {(props) => authenticated ? <Redirect to="/chatroom" /> : <Component {...props}/> }    
    />)
}

export default PublicRoute;