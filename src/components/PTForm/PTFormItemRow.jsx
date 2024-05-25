import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider';



const PTFormItemRow = ({name, goal}) => {
  
  
  return (
    <Stack direction='row' spacing={3} className='plan-row-stack'>
      <div className='width-half-parent'>
        {name}
      </div>
      <Divider orientation="vertical" flexItem />
      <div className='width-half-parent'>
        {goal}
      </div>
    </Stack>
  )
}

export default PTFormItemRow;