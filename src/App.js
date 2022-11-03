import { Box, Container } from "@mui/material";
import TitleBar from "./components/titlebar";
import Table from "./components/table";
import { createContext, useEffect, useRef, useState } from "react";
import LoadingSpinner from "./components/loading";
import StudentForm from "./components/studentform";
import SaveButtonGroup from "./components/table/SaveButtonGroup";
import Welcome from "./components/welcome";
import StudentFormModal from "./components/studentform";

const LoginContext = createContext();

function App() {
  const [students, setStudents] = useState([])
  const [week, setWeek] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  let totalWeek = 1;
  if (students[0]) {
    totalWeek = students[0].attendance.length;
  }

  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

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
          isFirstRender.current ?
          <>
            <Welcome />
            <Box sx={{pt: 2}}>
              <StudentFormModal />
            </Box>
          </>
          :
          isLoading ? 
          <>
            <LoadingSpinner /> 
            <SaveButtonGroup />
          </>
          :
          <Table 
            students={students} 
            week={week}
          />
        }
      </Box>
    </Container>
  );
}

export default App;
