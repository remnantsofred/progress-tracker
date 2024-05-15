import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import firebase from 'firebase/compat/app';
import { useState, useEffect } from 'react';
import { auth, provider } from '../../../firebase';



export default function ButtonAppBar({currentUser, setCurrentUser}) {
  const [signInHidden, setSignInHidden] = useState(true);
  const [signOutHidden, setSignOutHidden] = useState(false);

  // Sign in state change
  useEffect(() => {
    auth.onAuthStateChanged(user => {
        if (user) {
            // signed in
            setSignInHidden(false);
            setSignOutHidden(true);
            setCurrentUser(user);
            // navigate("/milestones")
            console.log('i am in logged in')
        } else {
            // not signed in
            setSignInHidden(true);
            setSignOutHidden(false);
            setCurrentUser('')
            // navigate("/")
            console.log('im in the second one')
        }
    });
  }, [])

  // useEffect(() => {
  //   // to do: fix inifite loop of going back to milestones if user
  //   if (currentUser) {
  //     navigate("/milestones")
  //   } else {
  //     navigate("/")
  //   }
  // }, [currentUser])

  const handleSignIn = () => {
    auth.signInWithPopup(provider);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"                        
            color="inherit"
            aria-label="menu"                         
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Progress Tracker
          </Typography>
          <section 
            id="whenSignedOut" 
            hidden={signOutHidden}>
            <Button 
              color="inherit" 
              id="signInBtn" 
              onClick={() => handleSignIn()}>
                Login
            </Button>
          </section>
          <section 
            id="whenSignedIn" 
            hidden={signInHidden}>

            <Button 
              id="signOutBtn"
              color="inherit"
              onClick={() => auth.signOut()}
              >                                                 
              Sign Out
            </Button>
          </section>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
