import './Countdown.css'
import { AuthContext } from "../../AuthContext";
import { db } from "../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useState, useEffect, useContext} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SimpleSnackbar from "../Snackbar/Snackbar";


const getTimeLeft = (date) => {
  const now = Date.now();
  const laterDate = Math.max(now, date);
  const earlierDate = Math.min(now, date);
  let status;

  laterDate === now ? status = 'past' : status = 'future';

  const totalTimeLeft = Math.floor(laterDate - earlierDate);

  const weeks = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24 * 7) );
  const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24) % 7);
  const hours = Math.floor(totalTimeLeft / (1000 * 60 * 60) % 24);
  const minutes = Math.floor(totalTimeLeft / (1000 * 60) % 60);
  const seconds = Math.floor(totalTimeLeft / (1000) % 60);
  return [status, {weeks, days, hours, minutes, seconds} ]
}


const Countdown = ({milestone, setEditModal}) => {
  const [timeLeft, setTimeLeft] = useState(()=> getTimeLeft(milestone.data().date));  
  const currentUser = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  
  const handleEdit = () => {
    setEditModal(milestone);
  }
  
  const handleDelete = async () => {
    console.log(milestone.id, 'milestone id that we deleted', milestone.data().name, 'milestone name')
    await deleteDoc(doc(db, "milestones", milestone.id));
    setOpen(true);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(milestone.data().date))
    }, 1000)
    return ()=> {
      clearInterval(timer)
    }
  }, [milestone.data().date]);

  return (
    <div className="countdown">
      {timeLeft[0] === 'future' && <h2>Countdown until {milestone.data().name}</h2>}
      {timeLeft[0] === 'past' && <h2>Time since {milestone.data().name}</h2>}
      <div className="content">
        {Object.entries(timeLeft[1]).map(el => {
          const label = el[0];
          const value = el[1];
          return (
            <div className="box" key={label}>
              <div className="value">
              <span>{value}</span>
              </div>
              <span className="label">{label}</span>
            </div>
          )
        })}
      <div className="column">
        <EditRoundedIcon className="milestone-edit-button" fontSize="small" color="action" onClick={() => handleEdit()}></EditRoundedIcon>
        <DeleteIcon className="milestone-delete-button" fontSize="small" color="action" onClick={() => handleDelete()}></DeleteIcon>
      </div>
      </div>
      <SimpleSnackbar
        open={open}
        setOpen={setOpen}
        autoHideDuration={6000}
        message="Milestone deleted"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }	
      }
      />
    </div>
  )
}

export default Countdown