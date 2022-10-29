import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SaveIcon from '@mui/icons-material/Save';

export default function SaveButtonGroup(props) {

  const attendancePost = async () => {
    const idAndAttendance = props.tempStudents.map((student) => {
      const {_id, attendance} = student;
      return {_id, attendance}
    })
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(idAndAttendance)
    }
    const patchResponse = await fetch('http://localhost:5000/api/v1/students', requestOptions)
    const response = patchResponse.json();
  }

  return (
    <ButtonGroup 
        aria-label="outlined primary button group"
        variant='contained' 
        disableElevation
        sx={{
            mt: 1,
            display: 'flex',
            justifyContent: 'flex-end',
        }}
    >
      <Button 
        startIcon={<SaveIcon />}
        onClick={attendancePost}
      >
        Save
      </Button>
      <Button onClick={props.attendanceReset}>Cancel</Button>
    </ButtonGroup>
  );
}
