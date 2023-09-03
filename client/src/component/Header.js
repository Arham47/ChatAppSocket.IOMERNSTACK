import { Button, Card } from "@mui/material";
import { Link } from "react-router-dom";
import {v4 as uuidv4} from "uuid";
function Header() {
  const roomId = uuidv4();
  return (
    <Card sx={{ marginTop: 5, backgroundColor: "gray" }} raised>
      <Link to={"/"}>
        <Button sx={{ color: "white", textDecoration: "none" }}>home</Button>
      </Link>
      <Link to={"/chats"}>
        <Button sx={{ color: "white", textDecoration: "none" }}>chat</Button>
      </Link>
      <Link to={`/room/${roomId}`}>
        <Button sx={{ color: "white", textDecoration: "none" }}>chat</Button>
      </Link>
    </Card>
  );
}

export default Header;
