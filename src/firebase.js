import firebase from "firebase"


var firebaseConfig = {
    apiKey: "AIzaSyBanJNzQdIOZG6taOSIzoGOOTukVzR8SAk",
    authDomain:"reactchatapp-a7e15.firebaseapp.com",
    databaseURL: "https://reactchatapp-a7e15-default-rtdb.firebaseio.com",
    projectId: "reactchatapp-a7e15",
  
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth;
  export const database = firebase.database();