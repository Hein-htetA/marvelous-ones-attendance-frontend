import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelectWeek() {
  const [week, setWeek] = React.useState(2);

  const handleChange = (event) => {
    setWeek(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
        <Select
          value={week}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={1}>Week 1</MenuItem>
          <MenuItem value={2}>Week 2</MenuItem>
          <MenuItem value={3}>Week 3</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
