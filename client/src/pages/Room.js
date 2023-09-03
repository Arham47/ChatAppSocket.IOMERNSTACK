import { useEffect } from "react";
import { useParams } from "react-router-dom"

function Room() {
    const params = useParams();
    useEffect(() => {
        console.log(params);     
    },[])
  return (
    <div>Room</div>
  )
}

export default Room