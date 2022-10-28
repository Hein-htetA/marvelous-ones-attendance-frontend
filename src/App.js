import { Box, Container } from "@mui/material";
import TitleBar from "./components/titlebar";
import Table from "./components/table";
import { useState } from "react";

function App() {
  const [students, setStudents] = useState([])
  const [week, setWeek] = useState(0);

  const handleClick = (index1, index2) => {
        setStudents((student) => {
            const temp = [...student];
            temp[index1].attendance[week][index2] = !temp[index1].attendance[week][index2]
            console.log(temp);
            return temp
        })
        console.log('in handleclick')
    }


  const attendancePost = async () => {
    const idAndAttendance = students.map((student) => {
      const {_id, attendance} = student;
      return {_id, attendance}
    })
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(idAndAttendance)
    }
    const postResponse = await fetch('http://localhost:5000/api/v1/students', requestOptions)
    console.log(await postResponse.json())
    console.log('post complete')
  }

  return (
    <Container 
      maxWidth={false}
      disableGutters={true}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'success.light',
      }}
    >
      <Box 
        sx={{
          backgroundColor: "warning.light",
          height: '1000px',
          width: '1000px',
        }}
      >   
        <TitleBar 
          setStudents={setStudents} 
          setWeek={setWeek}
          week={week}
        />
        <Table 
          students={students} 
          handleClick={handleClick} 
          attendancePost={attendancePost}
          week={week}
        />
      </Box>
    </Container>
  );
}

export default App;
