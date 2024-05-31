import './App.css'
import {  useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthContext } from './AuthContext.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MilestonesPage } from './components/MilestonesPage/MilestonesPage.jsx';
import BasicMenu from './components/BasicMenu/BasicMenu.jsx';
import EditMilestoneModal from './components/EditMilestoneModal/EditMilestoneModal.jsx';
import PTPage from './components/PTPage/PTPage.jsx';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.jsx';


function App() {
  const [currentUser, setCurrentUser] = useState('');
  const [editModal, setEditModal] = useState('');
  
  return (
    <>
      <AuthContext.Provider value={currentUser}>
        <LocalizationProvider dateAdapter={AdapterDayjs}> 
          
            <BasicMenu currentUser={currentUser} setCurrentUser={setCurrentUser} editModal={editModal} setEditModal={setEditModal}></BasicMenu> 
            { editModal !== '' && <EditMilestoneModal milestone={editModal} setEditModal={setEditModal} ></EditMilestoneModal>}

            <Routes>
              <Route path="/" element={ <HomePage />  }/>
                <Route path="milestones" element={ <MilestonesPage setEditModal={setEditModal}/> }/>
                <Route path="pt" element={ <PTPage />}/>
                  
            </Routes>
          

        </LocalizationProvider>
      </AuthContext.Provider >
    </>
  )
}

export default App;
