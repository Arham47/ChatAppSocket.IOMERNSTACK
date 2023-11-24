import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { Server } from "socket.io"
import http from "http"
import socket from "./Socket/SocketRoutes/Routes.js"


import {
  fileURLToPath
} from "url";
import AdminRoutes from "./Routes/AdminRoutes.js"
import BrainRoutes from "./Routes/BrainRoute.js"
import ClientRoutes from "./Routes/ClientRoutes.js"
import ChatRoutes from "./Routes/ChatRoutes.js"
import ProjectRoutes from "./Routes/ProjectRoutes.js"
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin:["http://localhost:3000"]
    }
});


io.on("connection", socket);

app.use("/admin", AdminRoutes);
app.use("/brain", BrainRoutes )
app.use("/client", ClientRoutes);
app.use("/chat", ChatRoutes);
app.use("/project", ProjectRoutes);


const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.CONNECTION_URL, {})
  .then(() =>
  httpServer.listen(4000, () =>
      console.log(`server is running on localhost:${4000}`)
    )
  )
  .catch((err) => console.log(err));

