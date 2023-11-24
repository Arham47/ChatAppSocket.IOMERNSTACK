import express from "express";
const router = express.Router();
import {parser} from "../Middlewares/Cloudinary.js"
import {createClient} from "../Controllers/ClientController.js"

router.post("/createClient", 
parser.single("public_id"), // Use "public_id" as the field name
createClient)



export default router;