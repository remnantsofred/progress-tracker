import './MilestonesPage.css';
import { AuthContext } from '../../AuthContext';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';
import { useContext, useEffect, useState } from 'react';
import Countdown from '../Countdown/Countdown.jsx';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import MilestoneForm from '../MilestoneForm/MilestoneForm.jsx';


export const MilestonesPage = ({setEditModal}) => {
  const currentUser = useContext(AuthContext);
  const [userMilestones, setUserMilestones] = useState('');
  const [order, setOrder] = useState(false);
  const [milestoneForm, setMilestoneForm] = useState(false);

  useEffect(()=> {
    if (currentUser) {
      const q = query(collection(db, "milestones"), where("uid", "==", currentUser.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const milestones = [];
        querySnapshot.forEach((doc) => {
          milestones.push(doc);
        });
        if (order === true) {
          setUserMilestones(sortDateAsc(milestones))
        } else {
          setUserMilestones(sortDateDsc(milestones))
        }
      });
    }
  }, [currentUser])

  const sortDateAsc = (milestones) => {
    const sorted = milestones.sort((a, b) => { return a.data().date - b.data().date });
    return sorted;
  }

  const sortDateDsc = (milestones) => {
    const sorted = milestones.sort((a, b) => { return b.data().date - a.data().date });
    return sorted;
  }
  
  return (
    <div className='milestones-page'>
      <h2>Milestones</h2>   
      <Button 
        className='create-pt-plan-button'
        onClick={() => setMilestoneForm(true)}>
          Add New Milestone
      </Button>
      { milestoneForm && <MilestoneForm setMilestoneForm={setMilestoneForm}/> }
      <Stack direction="row" spacing={1}>
        <Typography mt={0.5}>Asc</Typography>
        <Switch defaultChecked onClick={() => setOrder(!order)} label='Sort'></Switch>
        <Typography mt={0.5}>Dsc</Typography>
      </Stack>
      <ul>
          { userMilestones && userMilestones.map((milestone, idx)=> 
            { return (<Countdown
                        milestone={ milestone }
                        key={idx}
                        setEditModal={setEditModal}
                      />
            )}
          )}
      </ul>
    </div>
  )
}