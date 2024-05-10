import './MilestonesPage.css';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 
import { firebaseApp } from '../../../firebase';
import Countdown from '../Countdown/Countdown';


const db = getFirestore(firebaseApp);
const querySnapshot = await getDocs(collection(db, "milestones"));

// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });

export const MilestonesPage = () => {
  
  return (
    <ul>
        { querySnapshot.docs.map((milestone, idx)=> 
          { return (<Countdown
                      milestone={ milestone }
                      key={idx}
                    />
          )}
        )}
    </ul>
  )
}