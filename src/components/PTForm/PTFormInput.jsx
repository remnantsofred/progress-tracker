import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField';
import BasicSelect from '../BasicSelect';
import { useState } from 'react';

const PTFormInputRow  = ({planRows, setPlanRows}) => {
  const [itemName, setItemName] = useState('');
  const [goal, setGoal] = useState('')
  
  const handleAdd = () => {
    setPlanRows([...planRows, [itemName, goal]]);
    setItemName('');
    setGoal('');
  }

  return (
    <Stack direction='row' spacing={3} id='pt-form-input-row'>
      <div>New item</div>
      <TextField 
        variant="outlined"
        label="Item name"
        value={ itemName }
        onChange={ (e) => setItemName(e.target.value)}
        />
      <TextField 
        variant="outlined"
        label="Goal amount"
        value={ goal }
        onChange={ (e) => setGoal(e.target.value)}
        />
      
      <AddIcon 
        fontSize='small' 
        color='primary'
        onClick={() => handleAdd()}
        />
    </Stack>
  )
}

export default PTFormInputRow;