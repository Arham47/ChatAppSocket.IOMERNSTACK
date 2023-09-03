import { Button, Card } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
    return (
        <Card sx={{marginTop:5 , backgroundColor:"gray"}} raised>
          <Link to={"/"}>

              <Button sx={{color : "white",textDecoration:"none"}}>home</Button>
          </Link>
          <Link to={"/chats"}>

              <Button sx={{color : "white",textDecoration:"none"}}>chat</Button>
              </Link>
    </Card>
  );
}

export default Header;
