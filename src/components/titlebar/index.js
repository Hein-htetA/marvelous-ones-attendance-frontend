import { Box, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { LoginContext } from "../../App";
import BasicSelectBatch from "./BasicSelectBatch";
import BasicSelectWeek from './BasicSelectWeek';

export default function TitleBar(props) {
    const [batch, setBatch] = useState(1);
    const [invalid, setInvalid] = useState(false)

    const isLogin = useContext(LoginContext);

    const courseNameTemp = props.students[0]?.level;
    const courseName =  courseNameTemp ? 
                        courseNameTemp.charAt(0).toUpperCase() + 
                        courseNameTemp.slice(1) + " Class" 
                        :
                        'Elementary Class'

    const onBlur = async () => {
      if (Number(batch) < 1 || isNaN(Number(batch))) {
        setInvalid(true);
        return 
      }

      setInvalid(false);
      props.setIsLoading(true);
      const requestOptions = {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
        },
      }
      try {
        let response = await fetch(`http://localhost:5000/api/v1/students?batch=${batch}`,
                                    requestOptions);
        response = await response.json();
        console.log(response);
        props.setStudents(response.studentsByBatch)
      } catch (error) {
        console.log(error);
      }
      props.setIsLoading(false);
    }

    const onChange = (e) => {
      setBatch(e.target.value);
      setInvalid(false)
    }

    return (
      <>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{
              position: "relative"
            }}
          > 
            <Box 
              display='flex'
              justifyContent={'center'} 
              my='8px'
            >
              <img src='/images/bigLogo.png' alt='logo' height='90'/>
            </Box>
          </Box>
          <Box 
            display='flex'
            alignItems={'center'}
            justifyContent={'space-around'}

            sx={{
              py: 2,
              borderTop: '2px solid #b0bec5'
            }}
          >
            <BasicSelectBatch 
              onBlur={onBlur}
              onChange={onChange}
              value={batch}
              invalid={invalid}
              isLogin={isLogin}
            />
            <Typography 
              variant='h5'
              color="#1a237e"
            >
              {courseName}
            </Typography>
            <BasicSelectWeek 
              batch={batch} 
              setWeek={props.setWeek} 
              week={props.week} 
              totalWeek={props.totalWeek}
              setStudents={props.setStudents}
              setIsLoading={props.setIsLoading}
              isLogin={isLogin}
            />
        </Box>
      </>
    )
}