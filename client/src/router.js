import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ChatWindow from "./component/ChatWindow";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import Room from "./pages/Room";

const router = createBrowserRouter([
    {
      path: "/",
        element: <App />,
    children: [
      {
        path: "/",
        element:<Home/>
    },
      {
            path: "/chats",
            element:<Chats/>
      },
      {
        path: "/rooms/:roomId",
        element:<Room/>
  }
    ]
      
    },
]);
  
export default router;