import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function BasicSelectWeek(props) {

  const handleChange = (event) => {
    props.setWeek(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
        <Select
          value={props.week}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={0}>Week 1</MenuItem>
          <MenuItem value={1}>Week 2</MenuItem>
          <MenuItem value={2}>Week 3</MenuItem>
          <MenuItem sx={{justifyContent: 'center'}}>
            <IconButton 
              aria-label="add" 
              size='small'
              color='error'
              sx={{
                padding: '0px',
              }}
            >
              <AddIcon />
            </IconButton>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
