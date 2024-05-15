import '../App.css';
import { LoginPage } from '../components/LoginPage/LoginPage';
import { MilestonesPage } from '../components/MilestonesPage/MilestonesPage.jsx';
import { useState } from 'react';
import { AuthContext } from '../AuthContext';
import MilestoneForm from '../components/MilestoneForm/MilestoneForm.jsx';
import { Outlet } from "react-router-dom";
import BasicMenu from '../components/BasicMenu/BasicMenu.jsx';



export default function Root() {
  const [currentUser, setCurrentUser] = useState('');
  
  return (
    <>
      <AuthContext.Provider value={currentUser}>
        <BasicMenu currentUser={currentUser} setCurrentUser={setCurrentUser}></BasicMenu>
        <h1>Progress Tracker</h1>
        { currentUser && <MilestonesPage />}
        { currentUser && <MilestoneForm />}
        <div id="detail">
          {currentUser && <Outlet />}
        </div>
      </AuthContext.Provider >
    </>
  )
}