import express from "express";
const router = express.Router();
import {createFolderWithContent__controller, subfolder_controller} from "../Controllers/BrainsController.js";


// folders and documents creatio
router.post("/createFolderWithContent", createFolderWithContent__controller);

// Get id of the specific subfolder to link the documents to it

router.get("/getSubfolderObjectId", subfolder_controller)
    
  

export default router
