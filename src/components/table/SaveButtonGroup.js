import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SaveIcon from '@mui/icons-material/Save';
import StudentFormModal from '../studentform';
import { Box } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

export default function SaveButtonGroup(props) {

  return (
    <Box
      display={'flex'}
      justifyContent='space-between'
      mb={1}
    >
      <StudentFormModal />
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
            startIcon={<SaveAltIcon sx={{color: "white"}}/>}
            onClick={props.attendancePost}
          >
            Save
          </Button>
        }
        <Button 
          disabled={props.attendanceUpdateLoading} 
          onClick={props.attendanceReset}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </Box>

  );
}
