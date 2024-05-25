import './PTForm.css';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import PTFormInputRow from './PTFormInput';
import Stack from '@mui/material/Stack'
import { useState, useContext} from 'react';
import Button from '@mui/material/Button';
import PTFormItemRow from './PTFormItemRow';
import Divider from '@mui/material/Divider';
import { AuthContext } from '../../AuthContext';
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from '../../../firebase';


const PTForm = () => {
  const [planRows, setPlanRows] = useState([]);
  const currentUser = useContext(AuthContext);

  const createPlan = () => {
    const ptRef = doc(collection(db, 'pt-plans'));
    const newPTPlans = [];
    for (let plan of planRows) {
      const planObj = {'name': plan[0],'goal': plan[1], 'uid': currentUser.uid}
      newPTPlans.push(planObj)
    }
    setDoc(ptRef, {'uid': currentUser.uid, 'pt-plan': newPTPlans})
    setPlanRows([]);
    // to do: add error handling if no name or date
  }

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
        <Button  onClick={createPlan}>Save</Button>
      </Stack>
    </form>
  )
}

export default PTForm