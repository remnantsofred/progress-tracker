import { useState, useEffect} from "react";
import './Countdown.css'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';

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


const Countdown = ({milestone}) => {
  const [timeLeft, setTimeLeft] = useState(()=> getTimeLeft(milestone.date));  
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(milestone.date))
    }, 1000)
    return ()=> {
      clearInterval(timer)
    }
  }, [milestone.date]);

  return (
    <div className="countdown">
      {timeLeft[0] === 'future' && <h2>Countdown until {milestone.name}</h2>}
      {timeLeft[0] === 'past' && <h2>Time since {milestone.name}</h2>}
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
        <EditRoundedIcon className="milestone-edit-button" fontSize="small" color="action"></EditRoundedIcon>
        <DeleteIcon className="milestone-delete-button" fontSize="small"></DeleteIcon>
      </div>
      </div>
      
    </div>
  )
}

export default Countdown