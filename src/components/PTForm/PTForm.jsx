import './PTForm.css';
import { AuthContext } from '../../AuthContext';
import { db } from '../../../firebase';
import { doc, setDoc, collection } from "firebase/firestore";
import { useState, useContext} from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import PTFormInputRow from './PTFormInput';
import PTFormItemRow from './PTFormItemRow';
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


const PTForm = ({setPTForm}) => {
  const [planRows, setPlanRows] = useState([]);
  const [planName, setPlanName] = useState('');
  const [active, setActive] = useState(true);
  const currentUser = useContext(AuthContext);

  const createPlan = () => {
    const ptRef = doc(collection(db, 'ptPlans'));
    const newPTPlans = [];
    for (let plan of planRows) {
      const planObj = {'name': plan[0],'goal': Number(plan[1]), 'frequency': plan[2]}
      newPTPlans.push(planObj)
    }
    setDoc(ptRef, {'uid': currentUser.uid, 'name': planName,  'plan': newPTPlans, 'active': active })
    setPlanRows([]);
    setPlanName('');
    setPTForm(false);
    // to do: add error handling if no name or date
    // to do: also update user's plans 
  }

  return (
    <Paper className='PT-form' elevation={8} >
      <div className='close-button-div'>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setPTForm(false)}
          >
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
      <h3>New PT Plan</h3>
      <TextField 
        variant="outlined"
        label="Plan name"
        value={ planName }
        onChange={ (e) => setPlanName(e.target.value)}
        />

      { planRows.length > 0 && 
      <>
        <Stack direction='row' spacing={3} className='plan-row-stack'>
            <div className='width-third-parent'>
              Item
            </div>
            <Divider orientation="vertical" flexItem />
            <div className='width-third-parent'>
              Goal
            </div>
            <div className='width-third-parent'>
              Frequency
            </div>
        </Stack>
        <Divider orientation="horizontal" flexItem />
      </>
      }

      { planRows.map((plan, index)=> {
        return (
          <PTFormItemRow 
            key={index} 
            name={plan[0]}
            goal={plan[1]}
            frequency={plan[2]}
          />
        )
      })}

      <PTFormInputRow 
        planRows={planRows} 
        setPlanRows={setPlanRows}
        />
      <Stack direction="row" spacing={1} className='center'>
        <Typography mt={0.5}>Active</Typography>
        <Switch defaultChecked onClick={() => setActive(!active)} label='Active'></Switch>
      </Stack>
      <Button  onClick={createPlan}>Save</Button>

    </Paper>
  )
}

export default PTForm