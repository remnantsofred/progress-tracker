import './PTTracker.css';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase';
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { Card, Stack, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SimpleSnackbar from "../Snackbar/Snackbar";
import { useState, useEffect } from 'react';
import DailyRow from './DailyRow';

const PTTracker = () => {
  const { planId } = useParams();
  const ptPlanRef = doc(db, 'ptPlans', planId); 
  const [ ptPlan, setPTPlan ] = useState();
  const [ dailyGoals, setDailyGoals ] = useState();
  const [ weeklyGoals, setWeekylGoals ] = useState();
  // console.log(planId, 'planId from params')
  // console.log(ptPlanRef, 'ptPlanRef')
  const getDocSnap = async () => {
    const doc = await getDoc(ptPlanRef);

    if (doc.exists()) {
      console.log("Document data:", doc.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    setPTPlan(doc)
    // return doc;
  } 

  useEffect(()=>{
    getDocSnap();
    // console.log(ptPlan, 'ptPlan')
  }, [])


  const handleDelete = async () => {
    // console.log(ptPlan.id, 'ptPlan id that we deleted', ptPlan.data().name, 'pt plan name')
    // await deleteDoc(doc(db, "ptPlans", ptPlan.id));
    // setOpen(true);
    console.log('inside handle delete')
  }

  const getRows = () => {
    const rows = ptPlan.data().plan.map((item, index)=> { 
      return ({id: index, item: item.name, goal: item.goal, frequency: item.frequency })
    })
    return rows;
  }

  return (
    <Card sx={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
      <div className="row justify-content-flex-end">
        {/* <EditRoundedIcon className="milestone-edit-button" fontSize="small" color="action" onClick={() => handleEdit()}></EditRoundedIcon> */}
        <DeleteIcon className="milestone-delete-button" fontSize="small" color="action" onClick={() => handleDelete()}></DeleteIcon>
      </div>
      <Stack>
        <Typography variant='h6' >
          Plan Name: 
        </Typography>
        { ptPlan && ptPlan.data().name } 
        <br/>
        {/* <Typography variant='h6' >
          Status: 
        </Typography>
        <Typography variant='h6' >
         <Link to={ docSnap().id }> Track Plan</Link>
        </Typography> */}
      </Stack>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 50 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            {/* <TableCell align="right">Completed</TableCell> */}
            <TableCell align="right">Goal</TableCell>
            <TableCell align="right">Frequency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ptPlan && getRows().map((row, index) => <DailyRow row={row} key={index} />)}
        </TableBody>
      </Table>
    </TableContainer>
    </Card>
  )   
}

export default PTTracker;