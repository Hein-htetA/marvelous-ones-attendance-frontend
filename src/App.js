import { Box, Container } from "@mui/material";
import TitleBar from "./components/titlebar";
import Table from "./components/table";
import { useState } from "react";
import LoadingSpinner from "./components/loading";
import StudentForm from "./components/studentform";

function App() {
  const [students, setStudents] = useState([])
  const [week, setWeek] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  let totalWeek = 1;
  if (students[0]) {
    totalWeek = students[0].attendance.length;
  }


  return (
    <Container 
      maxWidth={false}
      disableGutters={true}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'success.light',
      }}
    >
      <Box 
        sx={{
          width: '1000px',
          backgroundColor: 'white'
        }}
      >   
        <TitleBar 
          setStudents={setStudents} 
          students={students}
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
            week={week}
            setIsLoading={setIsLoading}
          />
        }
      </Box>

    </Container>
  );
}

export default App;
