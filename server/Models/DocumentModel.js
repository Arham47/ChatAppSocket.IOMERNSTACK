// models/DocumentModel.js
import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  name: String,
  content: String,
  linkedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Subfolder" },
});

const Document = mongoose.model("Document", documentSchema);

export default Document;
