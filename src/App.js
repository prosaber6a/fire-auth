import React, { useState } from 'react';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
firebase.initializeApp(firebaseConfig);

function App() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const [user, setUser] = useState( {
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  } );
  const handleSignIn = () => {
    firebase.auth().signInWithPopup( provider )
    .then( result => {
      const {displayName, email, photoURL} = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      };
      setUser(signedInUser);
      console.log(displayName, email, photoURL);
      
    } )
    .catch( error => {
      console.log(error);
      
    } );
    
  }
  return (
    <div className="App">
      <button onClick={handleSignIn}>Sign In</button>
      {
        user.isSignedIn &&
        <div>
          <h2>Welcome, {user.name}</h2>
          <img className="App-logo" src={user.photo} alt=""/>
        </div>

      }
    </div>
    );
  }
  
  export default App;
  