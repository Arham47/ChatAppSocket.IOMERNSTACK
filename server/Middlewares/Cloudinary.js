import { v2 as cloudinary } from 'cloudinary';
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const folder = "Images";
    const filename = file.originalname.replace(/\s+/g, "_"); // Remove spaces from filename
    const format = getFormatFromExtension(file.originalname);

    return {
      folder: folder,
      format: format,
      public_id: filename,
    };
  },
});

function getFormatFromExtension(filename) {
  // Get the file extension from the filename
  const extension = filename.split(".").pop();

  // Define supported formats and their corresponding extensions
const formatMap = {
  png: ["png"],
  jpg: ["jpg", "jpeg"],
  gif: ["gif"],
 
 
};

  // Find the matching format for the extension
  for (const format in formatMap) {
    if (formatMap[format].includes(extension.toLowerCase())) {
      return format;
    }
  }

  // Default to png if the extension doesn't match any supported format
  return "png";
}


const parser = multer({storage: storage});
export {parser};
