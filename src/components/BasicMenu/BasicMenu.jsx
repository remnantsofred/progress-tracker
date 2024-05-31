import { auth, provider } from '../../../firebase';
import { useState, useEffect } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

export default function BasicMenu({currentUser, setCurrentUser}) {
  const [signInHidden, setSignInHidden] = useState(true);
  const [signOutHidden, setSignOutHidden] = useState(false);

  // const currentUser = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Sign in state change
  useEffect(() => {
    auth.onAuthStateChanged(user => {
        if (user) {
            // signed in
            setSignInHidden(false);
            setSignOutHidden(true);
            setCurrentUser(user);
            // navigate("/milestones")
        } else {
            // not signed in
            setSignInHidden(true);
            setSignOutHidden(false);
            setCurrentUser('')
            // navigate("/")
        }
    });
  }, [])


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth.signOut();
    handleClose();
  }


  return (
    <div>
      { currentUser ? <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      :
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={() => auth.signInWithPopup(provider)}
      >
        Login
      </Button>
      }
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        { currentUser &&  
        ( <div>
            <MenuItem onClick={handleClose}>
              <Link to="/">Home</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/milestones">Milestones</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/pt">PT</Link>
            </MenuItem>
            <MenuItem onClick={() => handleLogout()}>Logout
            </MenuItem> 
          </div> )}
      </Menu>
    </div>
  );
}
