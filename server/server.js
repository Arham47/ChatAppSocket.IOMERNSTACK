import express from "express"
import http from "http"
import { Server } from "socket.io"
import path from 'path';
import cors from "cors"
const app = express()

const PORT = 4000;
const __dirname = path
app.use(cors({
    origin:"http://localhost3000"
}))

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin:["http://localhost:3000"]
    }
});
app.get("/",(req, res)=> {
   res.sendFile(__dirname,)
})

io.on("connection", (socket) => {
    socket.on("send-message", (data) => {
        socket.broadcast.emit("message-from-server", data);
   })
   socket.on("disconnect", (socket) => {
      console.log("user Disconnected")
   })
})

httpServer.listen(PORT, () => {
    console.log("server is running on localhost:4000");
})