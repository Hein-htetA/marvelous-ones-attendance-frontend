import { Box, Container } from "@mui/material";
import TitleBar from "./components/titlebar";
import Table from "./components/table";
import { createContext, useEffect, useRef, useState } from "react";
import LoadingSpinner from "./components/loading";
import SaveButtonGroup from "./components/table/SaveButtonGroup";
import Welcome from "./components/welcome";
import StudentFormModal from "./components/studentform";

export const LoginContext = createContext();

function App() {
  const [students, setStudents] = useState([])
  const [week, setWeek] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  let totalWeek = 1;
  if (students[0]) {
    totalWeek = students[0].attendance.length;
  }
  console.log(totalWeek);

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
        <LoginContext.Provider value={isLogin}>
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
            <>
              <LoadingSpinner /> 
              <SaveButtonGroup />
            </> 
            :
            students.length === 0 ?
            <>
              <Welcome setIsLogin={setIsLogin} isLogin={isLogin}/>
              {
                isFirstRender &&
                <Box sx={{pt: 2}}>
                  <StudentFormModal />
                </Box>
              }
            </>
            :
            <Table 
              students={students} 
              week={week}
            />
          }
        </LoginContext.Provider>
      </Box>
    </Container>
  );
}

export default App;
