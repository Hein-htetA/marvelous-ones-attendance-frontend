import { Box, Container } from "@mui/material";
import TitleBar from "./components/titlebar";
import Table from "./components/table";
import { useState } from "react";

function App() {
  const [students, setStudents] = useState([])

  const handleClick = (index1, index2) => {
        setStudents((student) => {
            const temp = [...student];
            temp[index1].attendance[0][index2] = !temp[index1].attendance[0][index2]
            console.log(temp);
            return temp
        })
        console.log('in handleclick')
    }


  const attendancePost = () => {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(students[0])
    }
    fetch('http://localhost:5000/api/v1/students', requestOptions)
      .then(data => console.log(data))
      .catch(err => console.log(err));
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
        <TitleBar setStudents={setStudents}/>
        <Table students={students} handleClick={handleClick} attendancePost={attendancePost}/>
      </Box>
    </Container>
  );
}

export default App;
