import './App.css'
import { LoginPage } from './components/LoginPage/LoginPage'
import { MilestonesPage } from './components/MilestonesPage/MilestonesPage'
import {  useState } from 'react';
import { AuthContext } from './AuthContext';
import MilestoneForm from './components/MilestoneForm/MilestoneForm';
import ButtonAppBar from './components/AppBar/AppBar';

function App() {
  const [currentUser, setCurrentUser] = useState('');
  
  return (
    <>
      <AuthContext.Provider value={currentUser}>
        <ButtonAppBar></ButtonAppBar>
        <h1>Progress Tracker</h1>
        <LoginPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        { currentUser && <MilestonesPage />}
        { currentUser && <MilestoneForm />}
      </AuthContext.Provider >
    </>
  )
}

export default App
