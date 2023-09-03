import { useEffect, useState } from "react";

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
import { io } from "socket.io-client";

function ChatWindow() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimout, setTypingTimeout] = useState(null);
  const handleForm = (e) => {
    e.preventDefault();
    socket.emit("send-message", { message });
    setChat((prev) => [...prev, { message: message, recieved: false }]);

    setMessage("");
  };
  const handleInput = (e) => {
    setMessage(e.target.value);
    socket.emit("typing-started");
    if (typingTimout) clearTimeout(typing);
    setTypingTimeout(
      setTimeout(() => {
        socket.emit("typing-stoped");
      }, 1000)
    );
  };
  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);
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
          {chat.map((msg) => {
            return (
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
