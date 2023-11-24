import express from "express";
import { createChat, getProjectChat } from "../Controllers/ChatController.js";
const router = express.Router();

router.post("/create", createChat)
router.post("/getprojectchat", getProjectChat)

export default router;