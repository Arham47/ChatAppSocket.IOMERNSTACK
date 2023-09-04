import typingController from "../controller/typingController.js";


const socket = (socket) => {
    const typingSocket=new typingController(socket)
       socket.on("send-message", ({ message, roomId }) => {
        let skt = socket.broadcast
      
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("message-from-server", {message});
   })
    socket.on("typing-started", typingSocket.typingStart)
    socket.on("typing-stoped", typingSocket.typingStopController)
    socket.on("join-room", ({roomId}) => {
        socket.join(roomId)
        console.log("room joined")
   })
   socket.on("disconnect", (socket) => {
      console.log("user Disconnected")
   })
}

export default socket