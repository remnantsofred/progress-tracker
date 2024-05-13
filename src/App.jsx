import './App.css'
import { LoginPage } from './components/LoginPage/LoginPage'
import { MilestonesPage } from './components/MilestonesPage/MilestonesPage'
import {  useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

function App() {
  const [currentUser, setCurrentUser] = useState('');
  // const user = useContext(AuthContext);

  
  return (
    <>
      <AuthContext.Provider value={currentUser}>
        <LoginPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        { currentUser && <MilestonesPage />}
      </AuthContext.Provider >
    </>
  )
}

export default App
