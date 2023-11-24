import { Box, Button, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function Header({ socket }) {

  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);

  const createNewRoom = () => {
    const roomId = uuidv4();
    navigate(`/room/${roomId}`);
    socket.emit("new-room-created", { roomId });
    setRooms((prev) => [...prev, roomId]);

  };
  useEffect(() => {
 if (!socket) return;

   socket.on("new-room-created", (data) => {
      // Assuming 'roomId' is part of the data received
      const { roomId } = data;
      setRooms((prev) => [...prev, roomId]);
   });

   // Clean up the socket listener when the component unmounts
   return () => {
      socket.off("new-room-created");
   };
  }, [socket]);
  return (
    <Card sx={{ marginTop: 5, backgroundColor: "gray" }} raised>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Link style={{ textDecoration: "none" }} to={"/"}>
            <Button sx={{ color: "white" }}>home</Button>
          </Link>
          <Link style={{ textDecoration: "none" }} to={"/chats"}>
            <Button sx={{ color: "white" }}>chat</Button>
          </Link>

          {rooms.map((roomId) => {
            return (
              <Link style={{ textDecoration: "none" }} to={`/room/${roomId}`}>
              <Button sx={{ color: "white" }}>Room1</Button>
            </Link>
            )
          })}
        </Box>
        <Box>
          <Button sx={{ color: "white" }} onClick={createNewRoom}>
            New Room
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default Header;
