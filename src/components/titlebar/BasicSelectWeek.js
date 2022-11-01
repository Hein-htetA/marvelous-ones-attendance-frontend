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
      let response = await fetch(`http://localhost:5000/api/v1/students?batch=${props.batch}`);
      response = await response.json();
      props.setStudents(response.studentsByBatch)    
    } catch (error) {
      console.log(error)
    }
    props.setIsLoading(false)
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
      let response = await fetch(`http://localhost:5000/api/v1/students?batch=${props.batch}`);
      response = await response.json();
      props.setStudents(response.studentsByBatch)
      props.setWeek(0)    
    } catch (error) {
      console.log(error)
    }
    props.setIsLoading(false)
  }

  const menuItems = [];

  for (let i=0; i < props.totalWeek; i++) {
    menuItems.push(<MenuItem key={i} value={i}>{`Week ${i+1}`}</MenuItem>)
  }

  return (
    <div>
      <FormControl sx={{ width: '130px' }} size='small'>
        <Select
          value={props.week}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
          size='small'
        >
          {
            menuItems
          }
          <Box sx={{display:'flex', justifyContent: 'center'}}>
            <Button 
              aria-label="add" 
              size='small'
              color='error'
              onClick={addWeek}
            >
              <AddIcon />
            </Button>
            <Button 
              aria-label="add" 
              size='small'
              color='error'
              onClick={deleteWeek}
            >
              <DeleteIcon />
            </Button>
          </Box>
        </Select>
      </FormControl>
    </div>
  );
}
