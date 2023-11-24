import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  name: String,
  subfolders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subfolder" }],
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
});

const Folder = mongoose.model("Folder", folderSchema);

export default Folder;