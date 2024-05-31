import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PTFormItemRow from "../PTForm/PTFormItemRow";
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SimpleSnackbar from "../Snackbar/Snackbar";
import { useState } from 'react';
import { db } from "../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import Divider from '@mui/material/Divider';

const PTPlan = ({ptPlan}) => {
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    // setEditModal(milestone);
  }
  
  const handleDelete = async () => {
    console.log(ptPlan.id, 'ptPlan id that we deleted', ptPlan.data().name, 'pt plan name')
    await deleteDoc(doc(db, "ptPlans", ptPlan.id));
    setOpen(true);
  }

  return (
    <Card>
      <p>
        Plan: 
        { ptPlan.data().name }
      </p>
      <p>
        For: 
        { ptPlan.data().uid }
      </p>
      <p>
        Status: 
        { ptPlan.data().active ? 'active' : 'inactive'}
      </p>
      <>
        <Stack direction='row' spacing={3} className='plan-row-stack'>
            <div className='width-third-parent'>
              Item
            </div>
            <Divider orientation="vertical" flexItem />
            <div className='width-third-parent'>
              Goal
            </div>
            <div className='width-third-parent'>
              Frequency
            </div>
        </Stack>
        <Divider orientation="horizontal" flexItem />
      </>
      <ul>
        { ptPlan.data().plan.map((item, index)=> {
          return (
            < PTFormItemRow 
                key={index} 
                name={item.name}
                goal={item.goal}
                frequency={item.frequency}
            />
          )
        }) }
      </ul>
      <div className="column">
        <EditRoundedIcon className="milestone-edit-button" fontSize="small" color="action" onClick={() => handleEdit()}></EditRoundedIcon>
        <DeleteIcon className="milestone-delete-button" fontSize="small" color="action" onClick={() => handleDelete()}></DeleteIcon>
      </div>
      <SimpleSnackbar
        open={open}
        setOpen={setOpen}
        autoHideDuration={6000}
        message="PT Plan deleted"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }	
      }
      />
    </Card>
  )   
}

export default PTPlan;