import PTFormItemRow from "../PTForm/PTFormItemRow";
import Stack from '@mui/material/Stack'


const PTPlan = ({ptPlan}) => {
  console.log(ptPlan.data())

  return (
    <Stack>
      <div>
        Plan: 
        { ptPlan.data().name }
      </div>
      <div>
        For: 
        { ptPlan.data().uid }
      </div>
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