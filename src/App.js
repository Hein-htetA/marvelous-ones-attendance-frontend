import { Box, Container } from "@mui/material";
import TitleBar from "./components/titlebar";
import Table from "./components/table";
import { useState } from "react";
import LoadingSpinner from "./components/loading";

function App() {
  const [students, setStudents] = useState([])
  const [week, setWeek] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  console.log('app js');
  console.log(students);
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
            week={week}
            setIsLoading={setIsLoading}
          />
        }
      </Box>
    </Container>
  );
}

export default App;
