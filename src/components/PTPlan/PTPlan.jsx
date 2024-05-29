import PTFormItemRow from "../PTForm/PTFormItemRow";
import Stack from '@mui/material/Stack'


const PTPlan = ({ptPlan}) => {
  console.log(ptPlan.data())

  return (
    <Stack>
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
      
    </Stack>
  )   
}

export default PTPlan;