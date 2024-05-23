import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { AuthContext } from '../../AuthContext';
import { useContext, useState } from 'react';
import './EditMilestoneModal.css';
import { getDateTimeLocalFromUnix } from '../../utils/utils';
import { db } from '../../../firebase';
import { doc, setDoc } from "firebase/firestore";


export default function EditMilestoneModal({milestone, setEditModal}) {
  const [name, setName] = useState(milestone.data().name);
  const [date, setDate] = useState(getDateTimeLocalFromUnix(milestone.data().date));
  console.log(date, 'date', name, 'name', new Date(date).getTime(), 'new date formatted')

  const currentUser = useContext(AuthContext);

  const updateMilestone = () => {
    const formattedDate = new Date(date).getTime()
    const milestoneRef = doc(db, 'milestones', milestone.id);
    setDoc(milestoneRef, {'name': name,'date': formattedDate, 'uid': currentUser.uid})
    console.log('inside update milestone', formattedDate, ' formatted date', name, 'name')
    setEditModal('')
  }

  return (
    <div className='edit-milestone-modal'>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            minWidth: 300,
            height: 300,
          },
        }}
      >
        <Paper elevation={3} >
          <div action="" className="div">
          <div className='row'>
            <h3>Edit milestone</h3>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setEditModal('')}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" name="name" label="Name" variant="outlined"onChange={ (e) => setName(e.target.value)} value={name}/>
          </Box>
          {/* </div> */}
          <Box 
            component="form"
            // sx={{
            //   '& > :not(style)': { m: 1, width: '25ch' },
            // }}
            // noValidate
            
            >
            {/* <BasicDateTimePicker></BasicDateTimePicker> */}
            <input type="datetime-local" name="date" id="date" onChange={ (e) => setDate(e.target.value)} value={date}/>
          </Box>
          <div onClick={updateMilestone}>Save</div>
        </div>
        </Paper>
      </Box>

    </div>
  );
}