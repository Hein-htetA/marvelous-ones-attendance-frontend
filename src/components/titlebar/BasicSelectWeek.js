import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BasicSelectWeek(props) {

  const handleChange = (event) => {
    props.setWeek(event.target.value);
  };

  const addWeek = async () => {
    props.setIsLoading(true)
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({batch: props.batch})
    }
    try {
      const patchResponse = await fetch('http://localhost:5000/api/v1/course', requestOptions);
      const msg = await patchResponse.json();
      console.log(msg);
      let response = await fetch(`http://localhost:5000/api/v1/students?batch=${props.batch}`);
      response = await response.json();
      props.setStudents(response.studentsByBatch)    
    } catch (error) {
      console.log(error)
    }
    props.setIsLoading(false)
    console.log('basic select batch');
  }

  const deleteWeek = async () => {
    props.setIsLoading(true);
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({batch: props.batch})
    }
    try {
      const patchResponse = await fetch('http://localhost:5000/api/v1/course', requestOptions);
      const msg = await patchResponse.json();
      console.log(msg);
      let response = await fetch(`http://localhost:5000/api/v1/students?batch=${props.batch}`);
      response = await response.json();
      props.setStudents(response.studentsByBatch)
      props.setWeek(0)    
    } catch (error) {
      console.log(error)
    }
    console.log('basic select batch');
    props.setIsLoading(false)
  }

  const menuItems = [];

  for (let i=0; i < props.totalWeek; i++) {
    menuItems.push(<MenuItem key={i} value={i}>{`Week ${i+1}`}</MenuItem>)
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
        <Select
          value={props.week}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {
            menuItems
          }
          <Box sx={{display:'flex', justifyContent: 'space-around'}}>
            <IconButton 
              aria-label="add" 
              size='small'
              color='error'
              onClick={addWeek}
            >
              <AddIcon />
            </IconButton>
            <IconButton 
              aria-label="add" 
              size='small'
              color='error'
              onClick={deleteWeek}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Select>
      </FormControl>
    </div>
  );
}
