import { useEffect } from "react";
import { useParams } from "react-router-dom"
import {io} from "socket.io-client"
function Room() {
    const params = useParams();
    const socket=io()
    useEffect(() => {
          socket.emit("join-room",{roomId:params.roomId})
    },[])
  return (
    <div>Room</div>
  )
}

export default Room