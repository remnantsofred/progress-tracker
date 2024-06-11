import { Card, Stack, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState, useEffect } from 'react';
import SimpleSnackbar from '../Snackbar/Snackbar';

const DailyRow = ({row}) => {
  const [ num, setNum ] = useState(0);
  const [ open, setOpen ] = useState(false);

  useEffect(() => {
    if (num === row.goal) setOpen(true)
  }, [num])

  const minusStatus = () => {
    return num === 0 ? 'disabled' : ''
  }

  const countUp = () => {
    setNum(num + 1)
    // if (num === row.goal) setOpen(true);
  }
  
  const countDown = () => {
    if (num > 0) setNum(num - 1)
  }

  return (
    <>
      <SimpleSnackbar
        open={open}
        setOpen={setOpen}
        message="🥳 Woohoo! You reached your goal! 🎉✨"
        />
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {row.item}
        </TableCell>
        
        <TableCell align="right">
          <RemoveCircleOutlineIcon onClick={() => countDown()} color={minusStatus()} />
          { num } 
          <AddCircleOutlineIcon onClick={() => countUp()} />
          <br />
          / {row.goal} 
        </TableCell>
        <TableCell align="right">{row.frequency}</TableCell>
      </TableRow>
    </>
  )
}

export default DailyRow;