import './MilestonesPage.css';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, addDoc, collection, getDocs } from "firebase/firestore"; 
import { firebaseApp } from '../../../firebase';
import Countdown from '../Countdown/Countdown';
import MilestoneForm from '../MilestoneForm/MilestoneForm';
import { AuthContext } from '../../AuthContext';
import { useContext } from 'react';


const db = getFirestore(firebaseApp);
const querySnapshot = await getDocs(collection(db, "milestones"));

// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });
// await setDoc(doc(db, "cities", "LA"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// });



export const MilestonesPage = () => {
  const currentUser = useContext(AuthContext);
  
  return (
    <>
      <MilestoneForm db={db} ></MilestoneForm>
      <h1>hi {currentUser.displayName}</h1>
      <ul>
          { querySnapshot.docs.map((milestone, idx)=> 
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