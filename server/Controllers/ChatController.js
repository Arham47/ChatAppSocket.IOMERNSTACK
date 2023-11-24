import ChatModel from "../Models/ChatModel.js";
    
export const createChat = async (req, res) => {
    try {
      const newChat = new ChatModel(req.body);
      const savedChat = await newChat.save();
      res.json(savedChat);
    } catch (error) {
      res.status(500).json({ error: "Error creating chat" ,error});
    }
};
export const getProjectChat = async (req,res) => {
  const { chatType, workSpaceID, adminID } = req.body
  
  if (chatType === 0) {
  const chat= await ChatModel.find({
      workSpaceID,
       adminID,
      chatType:0,
      projectID: {
        $exists: true,
        $ne: null,
      },

    })
    res.status(200).json({message:"chats for project fetched successfully ",status:200,data:chat})
      
  } else if (chatType === 1) {
    const chat= await ChatModel.find({
      workSpaceID,
       adminID,
      chatType:1,
      clientID: {
        $exists: true,
        $ne: null,
      },

    })
    res.status(200).json({message:"chats for client fetched successfully ",status:200,data:chat})
  } else if (chatType === 2) {
    console.log(workSpaceID,adminID)
    const chat = await ChatModel.find({
      $and: [
        { workSpaceID:workSpaceID}, // Replace with the actual workspace ID
        { adminID:adminID}, // Replace with the actual admin ID
        { chatType: 2 },
        { groupID: { $exists: true } },
      ],
    });
    res.status(200).json({message:"chats for group fetched successfully ",status:200,data:chat})
    }

  }


    