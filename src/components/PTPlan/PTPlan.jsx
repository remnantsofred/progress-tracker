import { Card, Stack, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography  } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SimpleSnackbar from "../Snackbar/Snackbar";
import { useState } from 'react';
import { db } from "../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { Directions } from '@mui/icons-material';

const PTPlan = ({ptPlan, setOpen}) => {

  const handleEdit = () => {
    // setEditModal(milestone);
  }
  
  const handleDelete = async () => {
    console.log(ptPlan.id, 'ptPlan id that we deleted', ptPlan.data().name, 'pt plan name')
    await deleteDoc(doc(db, "ptPlans", ptPlan.id));
    setOpen(true);
  }


  const getRows = () => {
    const rows = ptPlan.data().plan.map((item, index)=> { 
      return ({id: index, item: item.name, goal: item.goal, frequency: item.frequency })
    })
    return rows;
  }

  const getStyle = () => {
    return ptPlan.data().active ? {color: 'green'} : {color: 'gray'}
  }
  

  return (
    <Card sx={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
      <div className="row justify-content-flex-end">
        <EditRoundedIcon className="milestone-edit-button" fontSize="small" color="action" onClick={() => handleEdit()}></EditRoundedIcon>
        <DeleteIcon className="milestone-delete-button" fontSize="small" color="action" onClick={() => handleDelete()}></DeleteIcon>
      </div>
      <Stack>
        <Typography variant='h6' >
          Plan Name: 
        </Typography>
        { ptPlan.data().name } 
        <br/>
        <Typography variant='h6' >
          Status: 
        </Typography>
        <p style={ getStyle() }>
        { ptPlan.data().active ? 'active' : 'inactive'}
        </p>
      </Stack>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 50 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Goal</TableCell>
            <TableCell align="right">Frequency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getRows().map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.item}
              </TableCell>
              <TableCell align="right">{row.goal}</TableCell>
              <TableCell align="right">{row.frequency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Card>
  )   
}

export default PTPlan;