import { Button, Card } from "@mui/material";
import { Link } from "react-router-dom";
import {v4 as uuidv4} from "uuid";
function Header() {
  const roomId = uuidv4();
  return (
    <Card sx={{ marginTop: 5, backgroundColor: "gray" }} raised>
      <Link style={{textDecoration:"none"}} to={"/"}>
        <Button sx={{ color: "white"}}>home</Button>
      </Link>
      <Link style={{textDecoration:"none"}} to={"/chats"}>
        <Button sx={{ color: "white"}}>chat</Button>
      </Link>
      <Link style={{textDecoration:"none"}} to={`/room/${roomId}`}>
        <Button sx={{ color: "white"}}>Room</Button>
      </Link>
    </Card>
  );
}

export default Header;
