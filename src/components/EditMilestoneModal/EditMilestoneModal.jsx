import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { AuthContext } from '../../AuthContext';
import { useContext, useState } from 'react';

export default function EditMilestoneModal({milestone}) {
  const [name, setName] = useState(milestone.data().name);
  const [date, setDate] = useState('2024-05-17T15:00');
  console.log(date, 'date from milestone into new date')
  const currentUser = useContext(AuthContext);

  const createMilestone = () => {
    const formattedDate = new Date(date).getTime()
    // to do: fix date?
    const milestoneRef = doc(collection(db, 'milestones'));
    setDoc(milestoneRef, {'name': name,'date': formattedDate, 'uid': currentUser.uid})
    setName('');
    setDate('')
    // to do: add error handling if no name or date
  }


  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={3} >
        <form action="" className="form">
        <h3>Edit milestone</h3>
        <div className='column left'>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" onChange={ (e) => setName(e.target.value)} value={name}/>
          
        </div>
        <div className='column left'>
          <label htmlFor="date">Date</label>
          <input type="datetime-local" name="date" id="date" onChange={ (e) => setDate(e.target.value)} value={date}/>
        </div>
        <div onClick={createMilestone}>Add</div>
      </form>
      </Paper>
    </Box>
  );
}