import './PTForm.css';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import PTFormInputRow from './PTFormInput';
import Stack from '@mui/material/Stack'
import { useState } from 'react';
import Button from '@mui/material/Button';
import PTFormItemRow from './PTFormItemRow';
import Divider from '@mui/material/Divider';

const PTForm = () => {
  const [planRows, setPlanRows] = useState([]);

  return (
    <form className='PT-form'>
      <h3>Create PT Plan</h3>
      { planRows.length > 0 && 
      <>
        <Stack direction='row' spacing={3} className='plan-row-stack'>
        <div className='width-half-parent'>
          Item
        </div>
        <Divider orientation="vertical" flexItem />
        <div className='width-half-parent'>
          Goal
        </div>
        </Stack>
        <Divider orientation="horizontal" flexItem />
      </>
      }
      <Stack spacing={2}>

        { planRows.map((plan, index)=> {
          return (
            <PTFormItemRow 
              key={index} 
              name={plan[0]}
              goal={plan[1]}
              
            />
          )
        })}

        <PTFormInputRow 
          planRows={planRows} 
          setPlanRows={setPlanRows}
          >

        </PTFormInputRow>
        <Button  >Save</Button>
      </Stack>
    </form>
  )
}

export default PTForm