
import Folder from "../Models/FolderModel.js";
import Subfolder from "../Models/SubfolderModel.js";
import Document from "../Models/DocumentModel.js";





// Controller function to create a folder with associated content
export const createFolderWithContent__controller = async (req, res) => {
  try {
    // Extracting folderName and contentItems from the request body
    const { folderName, contentItems } = req.body;

    // Checking if contentItems is an array; if not, convert it into an array
    const itemsArray = Array.isArray(contentItems) ? contentItems : [contentItems];

    // Creating a new Folder instance with the provided folderName
    const newFolder = new Folder({
      name: folderName,
    });

    // Saving the new folder to the database
    const savedFolder = await newFolder.save();

    // Arrays to store saved subfolders and documents
    const savedSubfolders = [];
    const savedDocuments = [];

    // Iterating through each contentItem in the itemsArray
    for (const contentItem of itemsArray) {
      try {
        // Checking if the contentItem and its type are valid
        if (contentItem && contentItem.type) {
          // Handling subfolders
          if (contentItem.type === "subfolder") {
            // Using findOneAndUpdate with upsert for avoiding duplicates
            const subfolder = await Subfolder.findOneAndUpdate(
              { name: contentItem.name },
              { name: contentItem.name },
              { upsert: true, new: true }
            );

            // Adding the subfolder to the savedSubfolders array
            savedSubfolders.push(subfolder);

            // Adding the subfolder to the subfolders array of the savedFolder
            await Folder.findByIdAndUpdate(savedFolder._id, {
              $addToSet: { subfolders: subfolder._id },
            });
          }
          // Handling documents
          else if (contentItem.type === "document") {
            // Creating a new Document instance with the provided name and content
            const newDocument = new Document({
              name: contentItem.name,
              content: contentItem.content,
            });

            // Checking if the document is linked to a subfolder
            if (contentItem.linkedTo) {
              // Finding the linked subfolder
              const subfolder = await Subfolder.findById(contentItem.linkedTo);
              if (subfolder) {
                // If found, setting the linkedTo property of the document
                newDocument.linkedTo = subfolder._id;

                // Adding the document to the documents array of the linked subfolder
                await Subfolder.findByIdAndUpdate(subfolder._id, {
                  $addToSet: { documents: newDocument._id },
                });
              } else {
                // If the linked subfolder is not found, logging an error
                console.error("Subfolder not found:", contentItem.linkedTo);
              }
            } else {
              // If the document is not linked to a subfolder, adding it to the documents array of the savedFolder
              await Folder.findByIdAndUpdate(savedFolder._id, {
                $addToSet: { documents: newDocument._id },
              });
            }

            // Saving the new document to the database
            const savedDocument = await newDocument.save();
            // Adding the saved document to the savedDocuments array
            savedDocuments.push(savedDocument);
          } else {
            // If the contentItem type is neither subfolder nor document, logging an error
            console.error("Invalid contentItem type:", contentItem.type);
          }
        } else {
          // If the contentItem or its type is missing or invalid, logging an error
          console.error("Invalid or missing contentItem:", contentItem);
        }
      } catch (error) {
        // Logging an error if there is an issue processing the contentItem
        console.error("Error processing contentItem:", error);
      }
    }

    // Creating a response object with the saved folder, subfolders, and documents
    const response = {
      folder: savedFolder,
      subfolders: savedSubfolders,
      documents: savedDocuments,
    };

    // Returning a 201 (Created) status along with the response object
    return res.status(201).json(response);
  } catch (error) {
    // Handling any unexpected errors and returning a 500 (Internal Server Error) status
    console.error("Error creating folder with content:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get id of the specific subfolder to link the documents to it
export const subfolder_controller = async (req, res) => {
  try {
    const { name } = req.query;

    // Find the Subfolder or create a new one if not exists
    let subfolder = await Subfolder.findOne({ name });

    if (!subfolder) {
      subfolder = new Subfolder({ name });
      await subfolder.save();
    }

    return res.status(200).json({ _id: subfolder._id });
  } catch (error) {
    console.error('Error getting Subfolder ObjectId:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


