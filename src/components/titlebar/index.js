import { Box } from "@mui/material";
import BasicSelectBatch from "./BasicSelectBatch";
import BasicSelectWeek from './BasicSelectWeek';

export default function TitleBar(props) {
    return (
        <Box
            display={'flex'}
            alignItems='flex-end'
            justifyContent={'space-around'}
            backgroundColor='white'
        >
            <BasicSelectBatch setStudents={props.setStudents}/>
            <img src='/images/bigLogo.png' alt='logo' height='80'/>
            <BasicSelectWeek setWeek={props.setWeek} week={props.week}/>
        </Box>
    )
}