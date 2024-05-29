import './PTForm.css';
import { AuthContext } from '../../AuthContext';
import { db } from '../../../firebase';
import { doc, setDoc, collection } from "firebase/firestore";
import { useState, useContext} from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import PTFormInputRow from './PTFormInput';
import PTFormItemRow from './PTFormItemRow';
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


const PTForm = () => {
  const [planRows, setPlanRows] = useState([]);
  const [planName, setPlanName] = useState('');
  const [active, setActive] = useState(true);
  const currentUser = useContext(AuthContext);

  const createPlan = () => {
    const ptRef = doc(collection(db, 'ptPlans'));
    const newPTPlans = [];
    for (let plan of planRows) {
      const planObj = {'name': plan[0],'goal': plan[1]}
      newPTPlans.push(planObj)
    }
    setDoc(ptRef, {'uid': currentUser.uid, 'name': planName,  'plan': newPTPlans, 'active': active })
    setPlanRows([]);
    setPlanName('');
    // to do: add error handling if no name or date
    // to do: also update user's plans 
  }

  return (
    <form className='PT-form'>
      <h3>Create PT Plan</h3>
      <Stack>
        <TextField 
          variant="outlined"
          label="Plan name"
          value={ planName }
          onChange={ (e) => setPlanName(e.target.value)}
          />
      </Stack>
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
        <Stack direction="row" spacing={1}>
          <Typography mt={0.5}>Active</Typography>
          <Switch defaultChecked onClick={() => setActive(!active)} label='Active'></Switch>
        </Stack>
        <Button  onClick={createPlan}>Save</Button>
      </Stack>
    </form>
  )
}

export default PTForm