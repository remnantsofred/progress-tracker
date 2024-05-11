import './MilestoneForm.css'
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from '../../../firebase';
import { useState } from 'react';
import "firebase/firestore";


const MilestoneForm = ({db}) => {
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const createMilestone = (e) => {
    e.preventdefault();
    console.log(name, 'name', date, 'date')
    db.collection.milestones.add({
      name,
      date
    })
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
      <button onSubmit={ (e) => createMilestone(e) }>Add</button>
    </form>
  )
}

export default MilestoneForm;