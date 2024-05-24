import './MilestonesPage.css';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';
import Countdown from '../Countdown/Countdown.jsx';
import { AuthContext } from '../../AuthContext';
import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


export const MilestonesPage = ({setEditModal}) => {
  const currentUser = useContext(AuthContext);
  const [userMilestones, setUserMilestones] = useState('');
  const [order, setOrder] = useState(false)

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
      <Stack direction="row" spacing={2}>
        <Button 
          variant="outlined"
          onClick={() => setOrder(true)}
          disabled={order}>
            Sort Ascending
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => setOrder(false)}
          disabled={ !order }
          >
            Sort Descending
        </Button>
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