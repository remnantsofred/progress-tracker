import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PTFormItemRow from "../PTForm/PTFormItemRow";
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SimpleSnackbar from "../Snackbar/Snackbar";

const PTPlan = ({ptPlan}) => {
  const handleEdit = () => {
    // setEditModal(milestone);
  }
  
  const handleDelete = async () => {
    // console.log(milestone.id, 'milestone id that we deleted', milestone.data().name, 'milestone name')
    // await deleteDoc(doc(db, "milestones", milestone.id));
    // setOpen(true);
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
      <ul>
        { ptPlan.data().plan.map((item, index)=> {
          return (
            < PTFormItemRow 
                key={index} 
                name={item.name}
                goal={item.goal}
            />
          )
        }) }
      </ul>
      <div className="column">
        <EditRoundedIcon className="milestone-edit-button" fontSize="small" color="action" onClick={() => handleEdit()}></EditRoundedIcon>
        <DeleteIcon className="milestone-delete-button" fontSize="small" color="action" onClick={() => handleDelete()}></DeleteIcon>
      </div>
    </Card>
  )   
}

export default PTPlan;