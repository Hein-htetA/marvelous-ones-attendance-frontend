import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Form from './Form';
import OutsideAlerter from './OutsideAlerter';

export default function StudentFormModal() {
  const [open, setOpen] = React.useState(false);
  const [registering, setRegistering] = React.useState(false)

  return (
    <Box display={'flex'} alignItems={'center'}>
      <Button 
        onClick={() => setOpen(true)}
        variant='contained'
        sx={{mt: 1}}
      >
        Register New Student
      </Button>
      {registering && 
      <Typography sx={{pl: 2, pt: 1}} variant='body2'>Registering...</Typography>
      }
      {open &&
        <OutsideAlerter setOpen={setOpen}>
          <Form setOpen={setOpen} setRegistering={setRegistering}/>
        </OutsideAlerter>
      }   
    </Box>
  );
}
