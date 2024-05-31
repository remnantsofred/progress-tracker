import './App.css'
import {  useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthContext } from './AuthContext.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MilestonesPage } from './components/MilestonesPage/MilestonesPage.jsx';
import BasicMenu from './components/BasicMenu/BasicMenu.jsx';
import EditMilestoneModal from './components/EditMilestoneModal/EditMilestoneModal.jsx';
import MilestoneForm from './components/MilestoneForm/MilestoneForm.jsx';
import PTPage from './components/PTPage/PTPage.jsx';

function App() {
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
          {/* <div id="detail">
            {currentUser && <Outlet milestone={editModal} setEditModal={setEditModal} />}
          </div> */}
        </LocalizationProvider>
      </AuthContext.Provider >
    </>
  )
}

export default App;
