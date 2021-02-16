import firebase from "firebase"


var firebaseConfig = {
    apiKey: "YOUR API KEY",
    authDomain:"YOUR_APP.firebaseapp.com",
    databaseURL: "YOUR DATABASE URL",
    projectId: "YOUR PROJECT ID",
  
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth;
  export const database = firebase.database();
