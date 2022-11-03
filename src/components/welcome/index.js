import { Box, Button, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";

export default function Welcome(props) {
    const [password, setPassword] = useState('');
    const [isPasswordVerifying, setIsPasswordVerifying] = useState(false);
    const [isWrongPassword, setIsWrongPassword] = useState(false)

    const searchInput = useRef(null);

    onchange = (e) => {
        setPassword(e.target.value);
    }

    const onClick = async () => {
        setIsPasswordVerifying(true);
        const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password })
        }
        try {
            let response = await fetch(`http://localhost:5000/api/v1/auth/login`, requestOptions);
            console.log(response);
            if (!response.ok) {
               setIsWrongPassword(true);
               setIsPasswordVerifying(false);
            } else {
                setIsPasswordVerifying(false);
                props.setIsLogin(true);
            }
          } catch (error) {
            console.log(error);
          }
    }
 
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        searchInput.current.blur();
        onClick();
        }
    }

    return(
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '350px',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            <Typography variant="h2">...Marvelous Ones...</Typography>
            <Box display={'flex'} alignItems='center'>
                <TextField
                    sx={{
                        '& legend': { display: 'none' },
                        '& fieldset': { top: 0 },
                      }}
                    id="outlined-error"
                    defaultValue="Hello World"
                    size='small'
                />
                <Button 
                    size='small'
                    onClick={onClick}
                    onKeyDown={handleKeyDown}
                >Login</Button>
                {isPasswordVerifying && <h1>verifying</h1>}
            </Box>

        </Box>
    )
}