import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Form from './Form';
import OutsideAlerter from './OutsideAlerter';

export default function StudentFormModal() {
  const [open, setOpen] = React.useState(false);
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Button 
        onClick={() => setOpen(true)}
        variant='contained'
        sx={{mt: 1}}
      >
        Register New Student
      </Button>

      {open &&
        <OutsideAlerter setOpen={setOpen}>
          <Form setOpen={setOpen}/>
        </OutsideAlerter>
      }   
    </Box>
  );
}
