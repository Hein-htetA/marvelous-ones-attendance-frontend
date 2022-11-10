import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export default function IconButtonCell(props) {
    return (
        <IconButton aria-label="delete" 
         onClick={() => props.editAttendance(props.index1, props.index2)}
         disabled={props.attendanceUpdateLoading}
         disableRipple={true}
         sx={{
            borderRadius: '0px',
            // '&:hover': {
            //     backgroundColor: '#006064',
            //     color: 'white'
            // }
         }}
        >
            {props.buttonState ? 
            <CheckIcon 
                fontSize='medium' 
                color='white'
                sx={{
                    backgroundColor: 'green',
                    color: 'white',
                    borderRadius: '20%'
                }}
            /> : 
            <ClearIcon fontSize='medium'
                sx={{
                    backgroundColor: '#c4001d',
                    color: 'white',
                    borderRadius: '20%'
                }}
            />
            }
        </IconButton>           
    );
}
