import '../App.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthContext } from '../AuthContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MilestonesPage } from '../components/MilestonesPage/MilestonesPage.jsx';
import { Outlet } from "react-router-dom";
import { useState } from 'react';
import BasicMenu from '../components/BasicMenu/BasicMenu.jsx';
import EditMilestoneModal from '../components/EditMilestoneModal/EditMilestoneModal.jsx';
import MilestoneForm from '../components/MilestoneForm/MilestoneForm.jsx';
import PTPage from '../components/PTPage/PTPage.jsx';


export default function Root() {
  const [currentUser, setCurrentUser] = useState('');
  const [editModal, setEditModal] = useState('');
  
  return (
    <>
      <AuthContext.Provider value={currentUser}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BasicMenu currentUser={currentUser} setCurrentUser={setCurrentUser}></BasicMenu>
          <h1>Progress Tracker</h1>
          { editModal !== '' && <EditMilestoneModal milestone={editModal} setEditModal={setEditModal} ></EditMilestoneModal>}
          { currentUser && <PTPage />}
          { currentUser && <MilestonesPage setEditModal={setEditModal}/>}
          { currentUser && <MilestoneForm />}
          <div id="detail">
            {currentUser && <Outlet />}
          </div>
        </LocalizationProvider>
      </AuthContext.Provider >
    </>
  )
}