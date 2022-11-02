import { Box, Typography } from "@mui/material";

export default function Welcome() {
    return(
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '350px',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography variant="h2">...Marvelous Ones...</Typography>
        </Box>
    )
}