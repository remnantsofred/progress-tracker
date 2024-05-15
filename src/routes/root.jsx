import '../App.css';
import { LoginPage } from '../components/LoginPage/LoginPage';
import { MilestonesPage } from '../components/MilestonesPage/MilestonesPage.jsx';
import { useState } from 'react';
import { AuthContext } from '../AuthContext';
import MilestoneForm from '../components/MilestoneForm/MilestoneForm.jsx';
import ButtonAppBar from '../components/AppBar/AppBar';
import { Outlet } from "react-router-dom";



export default function Root() {
  const [currentUser, setCurrentUser] = useState('');
  
  return (
    <>
      <AuthContext.Provider value={currentUser}>
        <ButtonAppBar currentUser={currentUser} setCurrentUser={setCurrentUser}></ButtonAppBar>
        {/* <h1>Progress Tracker</h1> */}
        {/* <LoginPage currentUser={currentUser} setCurrentUser={setCurrentUser}/> */}
        {/* { currentUser && <MilestonesPage />} */}
        {/* { currentUser && <MilestoneForm />} */}
        <div id="detail">
          {currentUser && <Outlet />}
          {/* <Outlet></Outlet> */}
        </div>
      </AuthContext.Provider >
    </>
  )
}