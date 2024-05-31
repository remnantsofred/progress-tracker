import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack'



const PTFormItemRow = ({name, goal, frequency}) => {
  
  
  return (
    <Stack direction='row' spacing={3} className='plan-row-stack'>
      <div className='width-third-parent'>
        {name}
      </div>
      <Divider orientation="vertical" flexItem />
      <div className='width-third-parent'>
        {goal}
      </div>
      <div className='width-third-parent'>
        {frequency}
      </div>
    </Stack>
  )
}

export default PTFormItemRow;