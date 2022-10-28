import { Box, Container } from "@mui/material";
import TitleBar from "./components/titlebar";
import Table from "./components/table";
import { useState } from "react";
import LoadingSpinner from "./components/loading";

function App() {
  const [students, setStudents] = useState([])
  const [week, setWeek] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  let totalWeek = 1;
  if (students[0]) {
    totalWeek = students[0].attendance.length;
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
    const patchResponse = await fetch('http://localhost:5000/api/v1/students', requestOptions)
    console.log(await patchResponse.json())
    console.log('patch complete')
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
          totalWeek={totalWeek}
          setIsLoading={setIsLoading}
        />

        {
          isLoading ? 
          <LoadingSpinner /> :
          <Table 
            students={students} 
            setStudents={setStudents}
            attendancePost={attendancePost}
            week={week}
            setIsLoading={setIsLoading}
          />
        }
      </Box>
    </Container>
  );
}

export default App;
