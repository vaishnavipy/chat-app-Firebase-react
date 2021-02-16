import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from "react-router-dom" 
import {ChatContextProvider} from "./chatContext"

ReactDOM.render(
  <Router>
    <ChatContextProvider>
      <App />
    </ChatContextProvider>
  </Router>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

