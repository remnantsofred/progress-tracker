import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({label, items, id}) {
  const [item, setItem] = React.useState('');

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={id + "-select-label"}>{label}</InputLabel>
        <Select
          labelId={id + "-select-label"}
          id={id + "-select"}
          value={item}
          label={label}
          onChange={handleChange}
        >
          { items.map((item, index)=>{
            return (
              <MenuItem key={index} value={item}>{item}</MenuItem>
            )
          }) }
        </Select>
      </FormControl>
    </Box>
  );
}
