import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SaveIcon from '@mui/icons-material/Save';
import StudentFormModal from '../studentform';
import { Box } from '@mui/material';

export default function SaveButtonGroup(props) {

  return (
    <Box
      display={'flex'}
      justifyContent='space-between'
      mb={3}
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
            startIcon={<SaveIcon />}
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
