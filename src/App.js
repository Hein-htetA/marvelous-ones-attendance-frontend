import { Container } from "@mui/material";


import TitleBar from "./components/titlebar";
import Table from "./components/table";
function App() {
  return (
    <Container sx={{
      backgroundColor: "primary.light",
    }}>   
      <TitleBar />
      <Table />
    </Container>
  );
}

export default App;
