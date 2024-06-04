import './PTPage.css';
import { AuthContext } from '../../AuthContext';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';
import { useContext, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import PTForm from '../PTForm/PTForm';
import PTPlan from '../PTPlan/PTPlan';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const PTPage = () => {
  const currentUser = useContext(AuthContext);
  const [userPTPlans, setUserPTPlans] = useState([]);
  const [ptForm, setPTForm] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const q = query(collection(db, "ptPlans"), where("uid", "==", currentUser.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const ptPlans = [];
        querySnapshot.forEach((doc) => {
          ptPlans.push(doc);
        });
        setUserPTPlans(ptPlans)
      });
    }
  }, [currentUser])


  return (
    <Container className='PT-page'>
      <h2>Physical Therapy</h2>
      <Button 
        sx={{marginBottom: '15px'}}
        onClick={() => setPTForm(true)}>
          Create PT Plan
      </Button>
      { ptForm && <PTForm setPTForm={setPTForm} />  }
      <Stack spacing={2}>
        <h3>PT Plans</h3>
        { userPTPlans && userPTPlans.map((plan, index)=> {
          return (
            <PTPlan 
              key={index}
              ptPlan={plan} />
          )
        })}
      </Stack>
    </Container>
  )
}

export default PTPage;