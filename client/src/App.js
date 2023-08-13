import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import TextField from "@mui/material/TextField";
import { Box, Container, Typography } from "@mui/material";
function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const handleForm = (e) => {
    e.preventDefault();
    socket.emit('send-message',{message});
    setMessage("")
  };

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
   
  }, []);
  useEffect(() => {
    if (!socket) return;
    if (socket) {
      socket.on("message-from-server", (data) => {
        setChat((prev)=>[...prev, data.message]);
     }) 
   }
    

  }, [socket]);

  return (
    <div>
      <Container >
        <Box sx={{marginBottom:5}}>
        {chat.map((msg) => {
          return (
        <Typography key={msg}>
            {msg}
        </Typography>
            
          )
        })}
          </Box>
      <Box component="form" onSubmit={handleForm}>
        <TextField id="standard-basic" label="Write Your Message" variant="standard"  value={message} onChange={(e)=>setMessage(e.target.value)}/>
        <Button variant="text" type="submit">Send</Button>
        </Box>
        </Container>
    </div>
  );
}

export default App;
