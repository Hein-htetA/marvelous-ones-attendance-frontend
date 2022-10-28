import { Box } from "@mui/material";
import { useState } from "react";
import BasicSelectBatch from "./BasicSelectBatch";
import BasicSelectWeek from './BasicSelectWeek';

export default function TitleBar(props) {
    const [batch, setBatch] = useState(1);
    return (
        <Box
            display={'flex'}
            alignItems='flex-end'
            justifyContent={'space-around'}
            backgroundColor='white'
        >
            <BasicSelectBatch 
                batch={batch} 
                setBatch={setBatch}
                setStudents={props.setStudents}
                setIsLoading={props.setIsLoading}
            />
            <img src='/images/bigLogo.png' alt='logo' height='80'/>
            <BasicSelectWeek 
                batch={batch} 
                setWeek={props.setWeek} 
                week={props.week} 
                totalWeek={props.totalWeek}
                setStudents={props.setStudents}
                setIsLoading={props.setIsLoading}
            />
        </Box>
    )
}