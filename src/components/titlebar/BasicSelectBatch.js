import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelectBatch() {
  const [batch, setBatch] = React.useState(1);

  const handleChange = (event) => {
    setBatch(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
        <Select
          value={batch}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={1}>Batch I</MenuItem>
          <MenuItem value={2}>Batch II</MenuItem>
          <MenuItem value={3}>Batch III</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
