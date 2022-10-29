import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export default function IconButtonCell(props) {
    return (
        <IconButton aria-label="delete" onClick={() => props.attendanceReset(props.index1, props.index2)}>
            {props.buttonState ? <CheckIcon /> : <ClearIcon />}
        </IconButton>           
    );
}
