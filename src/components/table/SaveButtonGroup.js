import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SaveIcon from '@mui/icons-material/Save';

export default function SaveButtonGroup(props) {

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
      {props.attendanceUpdateLoading ? 
        <Button
        >
          Saving...
        </Button>
        :
        <Button
          startIcon={<SaveIcon />}
          onClick={props.attendancePost}
        >
          Save
        </Button>
      }
      <Button disabled={props.attendanceUpdateLoading} onClick={props.attendanceReset}>Cancel</Button>
    </ButtonGroup>
  );
}
