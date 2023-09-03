import { Box, Container, Typography } from "@mui/material";
import ChatWindow from "./component/ChatWindow";
import { Outlet } from "react-router-dom";
import Header from "./component/Header";

function App() {
  return (
    <div>
      <Container>
        {/* <ChatWindow /> */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Header />
       
        <Outlet />
        
    </Box>
      </Container>
    </div>
  );
}

export default App;
