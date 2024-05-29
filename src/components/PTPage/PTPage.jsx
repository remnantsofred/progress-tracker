import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import PTForm from '../PTForm/PTForm';
import { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import PTPlan from '../PTPlan/PTPlan';
import { db } from '../../../firebase';
import { collection, query, where, onSnapshot } from "firebase/firestore";


const PTPage = () => {
  const currentUser = useContext(AuthContext);
  const [userPTPlans, setUserPTPlans] = useState([]);

  const q = query(collection(db, "ptPlans"), where("uid", "==", currentUser.uid));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const ptPlans = [];
    querySnapshot.forEach((doc) => {
      ptPlans.push(doc);
    });
    setUserPTPlans(ptPlans)
  });

  return (
    <Container >
      <h2>Physical Therapy</h2>
      <PTForm>
      </PTForm>
      <ul>
        { userPTPlans && userPTPlans.map((plan, index)=> {
          return (
            <PTPlan 
              key={index}
              ptPlan={plan} />
          )
        })}
      </ul>
    </Container>
  )
}

export default PTPage;