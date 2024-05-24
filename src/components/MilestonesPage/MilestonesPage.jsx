import './MilestonesPage.css';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';
import Countdown from '../Countdown/Countdown.jsx';
import { AuthContext } from '../../AuthContext';
import { useContext, useState } from 'react';
import EditMilestoneModal from '../EditMilestoneModal/EditMilestoneModal.jsx';


export const MilestonesPage = ({setEditModal}) => {
  const currentUser = useContext(AuthContext);
  const [userMilestones, setUserMilestones] = useState('');
  const [order, setOrder] = useState('dsc')

  const q = query(collection(db, "milestones"), where("uid", "==", currentUser.uid));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const milestones = [];
    querySnapshot.forEach((doc) => {
      milestones.push(doc);
    });
    if (order === 'asc') {
      setUserMilestones(sortDateAsc(milestones))
    } else {
      setUserMilestones(sortDateDsc(milestones))
    }
  });

  const sortDateAsc = (milestones) => {
    const sorted = milestones.sort(function(a, b){ return a.data().date - b.data().date });
    return sorted;
  }

  const sortDateDsc = (milestones) => {
    const sorted = milestones.sort(function(a, b){ return b.data().date - a.data().date });
    return sorted;
  }
  
  return (
    <div className='milestones-page'>
      <h2>Milestones</h2>
      <div>
        { order === 'dsc' && <button onClick={() => setOrder('asc')}
        >
          Sort Ascending
        </button> }
        { order === 'asc' && <button onClick={() => setOrder('dsc')}
        >
          Sort Descending
        </button>}
      </div>
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