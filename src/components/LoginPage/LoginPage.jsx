import './LoginPage.css';
import firebase from 'firebase/compat/app';
import { useState } from 'react';


export const LoginPage = ({currentUser, setCurrentUser}) => {
  const [signInHidden, setSignInHidden] = useState(true);
  const [signOutHidden, setSignOutHidden] = useState(false);
  
  // set up auth
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  // Sign in state change
  auth.onAuthStateChanged(user => {
      if (user) {
          // signed in
          setSignInHidden(false);
          setSignOutHidden(true);
          setCurrentUser(user);
      } else {
          // not signed in
          setSignInHidden(true);
          setSignOutHidden(false);
          setCurrentUser('')
      }
  });


  return (
    <div className='login-page'>
      <section 
        id="whenSignedOut" 
        hidden={signOutHidden}>
        <div className='login-page-container'>
          <h1>Login</h1>
          <button 
            id="signInBtn"
            onClick={() => auth.signInWithPopup(provider)}
            >
            Sign in with Google
          </button>
        </div>
  
      </section>
    
      <section 
        id="whenSignedIn" 
        hidden={signInHidden}>

        <div className='login-page-container'>
          <h1>Progress Tracker</h1>
          <div 
            id="userDetails">
              {currentUser ? `${currentUser.displayName} - ${currentUser.uid}` : ''}
          </div>
          <button 
            id="signOutBtn"
            onClick={() => auth.signOut()}
            >
            Sign Out
          </button>
        </div>
    
      </section>
    </div>
  )
}