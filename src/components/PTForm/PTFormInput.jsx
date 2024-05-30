import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField';
import BasicSelect from '../BasicSelect';

const PTFormInputRow  = ({planRows, setPlanRows}) => {
  const [itemName, setItemName] = useState('');
  const [goal, setGoal] = useState('');
  const [frequency, setFrequency] = useState('');
  
  const handleAdd = () => {
    setPlanRows([...planRows, [itemName, goal, frequency]]);
    setItemName('');
    setGoal('');
  }

  return (
    <Stack direction='column' spacing={1.5} id='pt-form-input-row'>
      <h4>Add new item</h4>
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
      <BasicSelect 
        label='Frequency'
        items={ ['daily', 'weekly'] }
        value={ frequency }
        setOther={ setFrequency }
        />
      <AddIcon 
        fontSize='medium' 
        color='primary'
        onClick={() => handleAdd()}
        />
    </Stack>
  )
}

export default PTFormInputRow;