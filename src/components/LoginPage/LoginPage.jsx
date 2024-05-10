import './LoginPage.css';
import { startFirebase } from '../../../firebase';
import firebase from 'firebase/compat/app';
import { useState } from 'react';



export const LoginPage = () => {
  const [signInHidden, setSignInHidden] = useState(true);
  const [signOutHidden, setSignOutHidden] = useState(false);
  const [loggedinUser, setLoggedinUser] = useState('');
  // initialie firebase
  startFirebase();
  
  // set up auth
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  // Sign in state change
  auth.onAuthStateChanged(user => {
      if (user) {
          // signed in
          setSignInHidden(false);
          setSignOutHidden(true);
          setLoggedinUser(user);
      } else {
          // not signed in
          setSignInHidden(true);
          setSignOutHidden(false);
          setLoggedinUser('')
      }
  });


  return (
    <div className='main-page'>
      <section 
        id="whenSignedOut" 
        hidden={signOutHidden}>

        <h1>Login</h1>
        <button 
          id="signInBtn"
          onClick={() => auth.signInWithPopup(provider)}
          >
          Sign in with Google
        </button>
  
      </section>
    
      <section 
        id="whenSignedIn" 
        hidden={signInHidden}>

        <h1>Welcome</h1>
        <div 
          id="userDetails">
            {loggedinUser ? `${loggedinUser.displayName} - ${loggedinUser.uid}` : ''}
        </div>
        <button 
          id="signOutBtn"
          onClick={() => auth.signOut()}
          >
          Sign Out
        </button>
    
      </section>
    </div>
  )
}