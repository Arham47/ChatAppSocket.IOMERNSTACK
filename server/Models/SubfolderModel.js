// models/SubfolderModel.js
import mongoose from "mongoose";

const subfolderSchema = new mongoose.Schema({
  name: String,
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
});

const Subfolder = mongoose.model("Subfolder", subfolderSchema);

export default Subfolder;
