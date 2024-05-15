import './MilestoneForm.css'
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from '../../../firebase';
import { useState,useContext } from 'react';
import { AuthContext } from '../../AuthContext';



const MilestoneForm = () => {
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const currentUser = useContext(AuthContext);

  const createMilestone = () => {
    const formattedDate = new Date(date).getTime()
    // to do: fix date?
    const milestoneRef = doc(collection(db, 'milestones'));
    setDoc(milestoneRef, {'name': name,'date': formattedDate, 'uid': currentUser.uid})
    // to do: add error handling if no name or date
  }


  return (
    <form action="" className="form">
      <h3>New milestone</h3>
      <div className='column left'>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={ (e) => setName(e.target.value)} />
        
      </div>
      <div className='column left'>
        <label htmlFor="date">Date</label>
        <input type="datetime-local" name="date" id="date" onChange={ (e) => setDate(e.target.value)}/>
      </div>
      <div onClick={createMilestone}>Add</div>
    </form>
  )
}

export default MilestoneForm;