import './LoginPage.css';
import { startFirebase } from '../../../firebase';
import firebase from 'firebase/compat/app';
import { useState } from 'react';



export const LoginPage = () => {
  // const [signedIn, setSignedIn] = useState(false);
  const [signInHidden, setSignInHidden] = useState(true);
  const [signOutHidden, setSignOutHidden] = useState(false);
  const [loggedinUser, setLoggedinUser] = useState('');
  startFirebase();
  // set up auth
  // const signInBtn = document.getElementById('signInBtn');
  // const signOutBtn = document.getElementById('signOutBtn');

  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  /// Sign in event handlers

  // signInBtn.onclick = () => auth.signInWithPopup(provider);
  // signOutBtn.onclick = () => auth.signOut();

  // const whenSignedOut = document.getElementById('whenSignedOut');
  // const userDetails = document.getElementById('userDetails');


  auth.onAuthStateChanged(user => {
      if (user) {
          // signed in
          // whenSignedIn.hidden = false;
          setSignInHidden(false);
          setSignOutHidden(true);
          // whenSignedOut.hidden = true;
          setLoggedinUser(user)


          // userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
      } else {
          // not signed in
          // whenSignedIn.hidden = true;
          setSignInHidden(true);
          setSignOutHidden(false);
          // whenSignedOut.hidden = false;
          setLoggedinUser('')
          // userDetails.innerHTML = '';
      }
  });


  return (
    <div className='main-page'>
      <section id="whenSignedOut" hidden={signOutHidden}>

      <h1>Login</h1>
      <button 
        id="signInBtn"
        onClick={() => auth.signInWithPopup(provider)}
        >
        Sign in with Google</button>
  
      </section>
    
      <section id="whenSignedIn" hidden={signInHidden}>
        <h1>Welcome</h1>
        <div id="userDetails">{loggedinUser ? `${loggedinUser.displayName} - ${loggedinUser.uid}` : ''}</div>
        <button 
          id="signOutBtn"
          onClick={() => auth.signOut()}
          >
          Sign Out</button>
    
      </section>

    </div>
  )
}