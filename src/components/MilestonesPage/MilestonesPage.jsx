import './MilestonesPage.css';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, addDoc, collection, query, where, getDocs, onSnapshot } from "firebase/firestore"; 
import { firebaseApp } from '../../../firebase';
import Countdown from '../Countdown/Countdown';
import MilestoneForm from '../MilestoneForm/MilestoneForm';
import { AuthContext } from '../../AuthContext';
import { useContext, useState } from 'react';


const db = getFirestore(firebaseApp);


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
    <>
      <MilestoneForm db={db} ></MilestoneForm>
      <ul>
          { userMilestones && userMilestones.map((milestone, idx)=> 
            { return (<Countdown
                        milestone={ milestone }
                        key={idx}
                      />
            )}
          )}
      </ul>
    </>
  )
}