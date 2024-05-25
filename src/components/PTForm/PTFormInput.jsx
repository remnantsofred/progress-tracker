import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField';
import BasicSelect from '../BasicSelect';
import { useState } from 'react';

const PTFormInputRow  = () => {
  const [itemName, setItemName] = useState();
  

  return (
    <Stack direction='row' spacing={3} id='pt-form-input-row'>
      <div>New item</div>
      <TextField 
        variant="outlined"
        label="Item name"
        value={itemName}
        />
      <TextField 
        variant="outlined"
        label="Goal amount"
        />
      
      <AddIcon 
        fontSize='small' 
        color='primary'
       
        />
    </Stack>
  )
}

export default PTFormInputRow;