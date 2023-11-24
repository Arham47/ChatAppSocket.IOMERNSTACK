import { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import OutlinedInput from "@mui/material/OutlinedInput";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { useOutletContext, useParams } from "react-router-dom";

function ChatWindow() {
 const {socket}= useOutletContext()
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimout, setTypingTimeout] = useState(null);
  const { roomId } = useParams()
  const fileRef=useRef(null)
  const handleForm = (e) => {
    e.preventDefault();
    socket.emit("send-message", { message,roomId });
    setChat((prev) => [...prev, { message: message, recieved: false }]);

    setMessage("");
  };
  const handleInput = (e) => {
    setMessage(e.target.value);
    socket.emit("typing-started",{roomId});
    if (typingTimout) clearTimeout(typing);
    setTypingTimeout(
      setTimeout(() => {
        socket.emit("typing-stoped",{roomId});
      }, 1000)
    );
  };
  const selectFile = ()=>{

    fileRef.current.click();
  }
  const fileSelected = (e)=>{

    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const data = reader.result;
      socket.emit("upload", { data, roomId });
      setChat((prev) => [
        ...prev,
        { message: reader.result, received: false, type: "image" },
      ]);
    }; 
  }

  useEffect(() => {
    if (!socket) return;
    if (socket) {
      socket.on("message-from-server", (data) => {
        setChat((prev) => [...prev, { message: data.message, recieved: true }]);
      });
      socket.on("typing-started-from-server", () => {
        setTyping(true);
      });
      socket.on("typing-stoped-from-server", () => {
        setTyping(false);
      });
      
    socket.on("uploaded", (data) => {
      console.log(data);
      setChat((prev) => [
        ...prev,
        { message: data.buffer, received: true, type: "image" },
      ]);
    });
    }
  }, [socket]);
  return (
    
      <Card
        sx={{
          padding: 2,
          marginTop: 10,
          width: "60%",
          background: "gray",
          color: "white",
        }}
      >
        {" "}
      <Box sx={{ marginBottom: 5 }}>
      {roomId &&  <Typography> this is our room ID {roomId}</Typography>}

          {chat.map((msg) => {
            return (
              msg.type==='image'?<img src={msg.message} width={200} alt="imge"/>:
              <Typography
                key={msg.message}
                sx={{ textAlign: msg.recieved && "right" }}
              >
                {msg.message}
              </Typography>
            );
          })}
        </Box>
        <Box component="form" onSubmit={handleForm}>
          {typing && (
            <InputLabel
              sx={{ color: "white" }}
              shrink
              htmlFor="bootstrap-input"
            >
              Typing
            </InputLabel>
          )}
          <OutlinedInput
            sx={{ backgroundColor: "white", width: "100%" }}
            size="small"
            placeholder="write your message"
            value={message}
            onChange={handleInput}
            endAdornment={
              <InputAdornment position="end">
                <input
                  onChange={fileSelected}
                  ref={fileRef}
                  type="file"
                  style={{ display: "none" }}
                />
                <IconButton
                  type="button"
                  edge="end"
                  sx={{ marginRight: 1 }}
                  onClick={selectFile}
                >
                  <AttachFileIcon />
                </IconButton>
                <IconButton type="submit" edge="end">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </Card>
    
  );
}

export default ChatWindow;
