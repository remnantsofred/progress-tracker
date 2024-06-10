import './PTTracker.css';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase';
import { doc, setDoc } from "firebase/firestore";

const PTTracker = () => {
  const { planId } = useParams();
  console.log(planId, 'planId from params')
  const ptPlanRef = doc(db, 'ptPlans', planId); 
  console.log(ptPlanRef, 'ptPlanRef')

  return (
    <div>
      Hi I am the PT Tracker, for { planId }
      {/* { ptPlanRef } */}
    </div>
  )
}

export default PTTracker;