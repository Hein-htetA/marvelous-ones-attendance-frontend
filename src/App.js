import { Box, Container } from "@mui/material";
import TitleBar from "./components/titlebar";
import Table from "./components/table";
function App() {
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
        <TitleBar />
        <Table />
      </Box>
    </Container>
  );
}

export default App;
