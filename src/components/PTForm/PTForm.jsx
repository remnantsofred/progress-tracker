import './PTForm.css';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import PTFormInputRow from './PTFormInput';
import Stack from '@mui/material/Stack'
import { useState } from 'react';
import Button from '@mui/material/Button';

const PTForm = () => {
  const [planRows, setPlanRows] = useState([]);

  return (
    <form className='PT-form'>
      <h3>Create PT Plan</h3>
      <Stack spacing={2}>
        
        <PTFormInputRow ></PTFormInputRow>
        <Button  >Save</Button>
      </Stack>
    </form>
  )
}

export default PTForm