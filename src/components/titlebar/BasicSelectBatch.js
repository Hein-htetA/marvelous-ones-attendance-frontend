import { Box, InputAdornment, TextField } from '@mui/material';
import * as React from 'react';


export default function BasicSelectBatch({ onBlur, onChange, value, invalid, isLogin }) {

  const searchInput = React.useRef(null);
  React.useEffect(() => {
    if (isLogin) {
      searchInput.current.focus();
    }
  }, [isLogin]);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchInput.current.blur();
      onBlur();
    }
  }

  return (
    <Box display={'flex'} alignItems='center'>
      <TextField
        id="outlined-start-adornment"
        name='batch'
        sx={{ 
          width: '150px',
          '& legend': { display: 'none' },
          '& fieldset': { top: 0 }
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">Batch No.</InputAdornment>,
        }}
        size='small'
        value={value}
        error={invalid}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        inputRef={searchInput}
        disabled={!isLogin}
        
      />
      {invalid && <span>Invalid Batch Number</span>}
    </Box>
  );
}
