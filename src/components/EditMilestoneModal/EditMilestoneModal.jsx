import './EditMilestoneModal.css';
import { AuthContext } from '../../AuthContext';
import { db } from '../../../firebase';
import { doc, setDoc } from "firebase/firestore";
import { getDateTimeLocalFromUnix } from '../../utils/utils';
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function EditMilestoneModal({milestone, setEditModal}) {
  const [name, setName] = useState(milestone.data().name);
  const [date, setDate] = useState(getDateTimeLocalFromUnix(milestone.data().date));
  const currentUser = useContext(AuthContext);

  const updateMilestone = () => {
    const formattedDate = new Date(date).getTime()
    const milestoneRef = doc(db, 'milestones', milestone.id);
    setDoc(milestoneRef, {'name': name,'date': formattedDate, 'uid': currentUser.uid})
    setEditModal('')
  }

  return (
    <Paper elevation={3} className='edit-milestone-modal'>
      <div className='close-button-div'>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setEditModal('')}
          >
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
      <h3>Edit milestone</h3>
      <Stack spacing={2.5} >
        <TextField id="outlined-basic" name="name" label="Name" variant="outlined"onChange={ (e) => setName(e.target.value)} value={name}/>
        <input type="datetime-local" name="date" id="date" onChange={ (e) => setDate(e.target.value)} value={date}/>
        <Button onClick={updateMilestone}>Save</Button>
      </Stack>
    </Paper>
  );
}