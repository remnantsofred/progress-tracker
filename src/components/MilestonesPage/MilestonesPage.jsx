import './MilestonesPage.css';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';
import Countdown from '../Countdown/Countdown.jsx';
import { AuthContext } from '../../AuthContext';
import { useContext, useState } from 'react';


export const MilestonesPage = () => {
  const currentUser = useContext(AuthContext);
  const [userMilestones, setUserMilestones] = useState('');
  
  const q = query(collection(db, "milestones"), where("uid", "==", currentUser.uid));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const milestones = [];
    querySnapshot.forEach((doc) => {
      milestones.push(doc.data());
    });
    setUserMilestones(milestones)
  });
  
  return (
    <div className='milestones-page'>
      <h2>Milestones</h2>
      <ul>
          { userMilestones && userMilestones.map((milestone, idx)=> 
            { return (<Countdown
                        milestone={ milestone }
                        key={idx}
                      />
            )}
          )}
      </ul>
    </div>
  )
}