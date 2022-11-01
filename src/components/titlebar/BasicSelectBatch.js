import { InputAdornment, TextField } from '@mui/material';
import * as React from 'react';


export default function BasicSelectBatch({ onBlur, onChange, value, invalid }) {

  return (
    <TextField
      id="outlined-start-adornment"
      name='batch'
      sx={{ width: '150px' }}
      InputProps={{
        startAdornment: <InputAdornment position="start">Batch No.</InputAdornment>,
      }}
      autoFocus
      size='small'
      value={value}
      error={invalid}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
}
