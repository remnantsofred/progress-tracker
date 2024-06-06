import './MilestoneForm.css'
import { AuthContext } from '../../AuthContext';
import { db } from '../../../firebase';
import { doc, setDoc, collection } from "firebase/firestore";
import { useState,useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const MilestoneForm = ({setMilestoneForm}) => {
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const currentUser = useContext(AuthContext);

  const createMilestone = () => {
    const formattedDate = new Date(date).getTime()
    // to do: fix date?
    const milestoneRef = doc(collection(db, 'milestones'));
    setDoc(milestoneRef, {'name': name,'date': formattedDate, 'uid': currentUser.uid})
    setName('');
    setDate('');
    setMilestoneForm(false);
    // to do: add error handling if no name or date
  }

  // to do: create toggle/filter to view only past, only upcoming, sort, etc

  return (
    <Paper className='PT-form' elevation={8}>
      <div className='close-button-div'>
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setMilestoneForm(false)}
            >
            <CloseIcon fontSize="small" />
        </IconButton>
      </div>
      <h3>New milestone</h3>
        <TextField 
        variant="outlined"
        label="Name"
        value={ name }
        onChange={ (e) => setName(e.target.value)}
        />
        <input type="datetime-local" name="date" id="date" onChange={ (e) => setDate(e.target.value)} value={date}/>
      <Button onClick={createMilestone}>Add </Button>
    </Paper>
  )
}

export default MilestoneForm;