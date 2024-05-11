import './MilestonesPage.css';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, addDoc, collection, getDocs } from "firebase/firestore"; 
import { firebaseApp } from '../../../firebase';
import Countdown from '../Countdown/Countdown';
import MilestoneForm from '../MilestoneForm/MilestoneForm';



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
  
  return (
    <>
      <MilestoneForm db={db} ></MilestoneForm>
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