import { Box, Typography } from "@mui/material";
import BasicSelectBatch from "./BasicSelectBatch";
import BasicSelectWeek from './BasicSelectWeek';

export default function TitleBar() {
    return (
        <Box
            display={'flex'}
            alignItems='flex-end'
            justifyContent={'space-around'}
            backgroundColor='white'
        >
            <BasicSelectBatch />
            <img src='/images/bigLogo.png' alt='logo' height='80'/>
            <BasicSelectWeek />
        </Box>
    )
}