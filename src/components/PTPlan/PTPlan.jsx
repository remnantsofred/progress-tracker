import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PTFormItemRow from "../PTForm/PTFormItemRow";
import Stack from '@mui/material/Stack';


const PTPlan = ({ptPlan}) => {
  

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
      
    </Card>
  )   
}

export default PTPlan;