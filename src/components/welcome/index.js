import { Box, Button, styled, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";

const LoginTypography = styled(Typography)(() => ({
    fontSize: '1rem',
    fontWeight: 'bold'
}))

export default function Welcome(props) {
    const [password, setPassword] = useState('');
    const [passwordStatus, setPasswordStatus] = useState({
        verifying: false,
        wrongPassword: false
    })

    const searchInput = useRef(null);

    const onChange = (e) => {
        setPasswordStatus({...passwordStatus, wrongPassword: false})
        setPassword(e.target.value);
    }

    const onClick = async () => {
        setPasswordStatus({...passwordStatus, verifying: true})
        const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password })
        }
        try {
            let response = await fetch(`http://localhost:5000/api/v1/auth/login`, requestOptions);
            let data = await response.json();
            if (!response.ok) {
               setPasswordStatus({verifying: false, wrongPassword: true})
            } else {
                setPasswordStatus({...passwordStatus, verifying: false})
                props.setIsLogin(true);
                sessionStorage.setItem('jwtToken', data.token)
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

    console.log(passwordStatus);

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
                <Box 
                    display={'flex'} 
                    alignItems='center'
                   
                >
                    {!props.isLogin ?
                    <Box 
                        display={'flex'} 
                        justifyContent='center' 
                        alignItems={'center'} 
                        sx={{
                            width: '500px'
                        }}
                    >
                        <TextField
                            autoFocus
                            sx={{
                                '& legend': { display: 'none' },
                                '& fieldset': { top: 0 },
                            }}
                            id="outlined-error"
                            size='small'
                            placeholder='Enter Password'
                            onChange={onChange}
                            onKeyDown={handleKeyDown}
                            inputRef={searchInput}
                        />
                        <Button 
                            size='small'
                            onClick={onClick}
                            onKeyDown={handleKeyDown}
                            variant='contained'
                            sx={{
                                width: '110px',
                                mx: '10px',
                                height: '40px',
                                padding: '10px'
                            }}
                        >
                            {
                                passwordStatus.verifying ? 
                                <LoginTypography variant="subtitle2">Verifying</LoginTypography> : 
                                passwordStatus.wrongPassword ?
                                <LoginTypography sx={{lineHeight: '1.1'}}>Wrong Pasword!</LoginTypography> : 
                                <LoginTypography>Login</LoginTypography>
                            }
                        </Button>
                    </Box>

                    :

                    <h1>Login Successfully</h1>
                    }
                </Box>
     
        </Box>
    )
}