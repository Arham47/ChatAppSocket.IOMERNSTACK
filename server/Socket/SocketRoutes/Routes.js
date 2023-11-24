import MessageController from "../SocketController/MessageController.js";
import typingController from "../SocketController/typingController.js";
import RoomController from "../SocketController/RoomController.js";
import fs from "fs"



const socket = (socket) => {
   const typingSocket = new typingController(socket)
   const messageController = new MessageController(socket)
   const roomController = new RoomController(socket)

   socket.on("send-message", messageController.sendMessage)
   socket.on("typing-started", typingSocket.typingStart)
   socket.on("typing-stoped", typingSocket.typingStopController)
   socket.on("join-room",roomController.joinRoom)
   socket.on("new-room-created",roomController.newRoomCreated)
   socket.on("upload", ({ data, roomId }) => {
      fs.writeFile(
         "upload/" + "test.png",
         data,
         { encoding: "base64" },
         () => { }
      );
      socket.to(roomId).emit("uploaded", { buffer: data.toString("base64") });
   })
   socket.on("disconnect", (socket) => {
      console.log("user Disconnected")
   })
}

export default socket