import './MilestonesPage.css';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 
import { firebaseApp } from '../../../firebase';


const db = getFirestore(firebaseApp);


const querySnapshot = await getDocs(collection(db, "milestones"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});


export const MilestonesPage = () => {
  
  return (
    <div>
      Milestones page
    </div>
  )
}