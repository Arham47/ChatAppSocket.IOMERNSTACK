// Saving a new Client in database 
import ClientModel from "../Models/ClientModel.js";
import nodemailer from "nodemailer";
import cloudinary from "cloudinary";

 export const createClient = async (req, res) => {
  try {
    const {
      clientName,
      adminID,
      workSpace,
      brief,
      image,
      clientTag,
      clientType,
      teamMember,
      adminMember,
      inviteClient,
      inviteMessage,
    } = req.body;
    console.log("req", req.file)
    let userImage1 = req.file ? req.file.path : '';

    // Upload the image to Cloudinary
    if (userImage1 !== null) {
      const cloudinaryResponse = await cloudinary.uploader.upload(userImage1, { folder: "Images" });
      userImage1 = cloudinaryResponse.secure_url;
    }


    // Check if inviteClient is provided
    if (!inviteClient) {
      return res.status(400).json({ error: 'inviteClient is required' });
    }

    // Create a new instance of the ClientModel
    const newClient = new ClientModel({
      clientName,
      adminID,
      workSpace,
      brief,
      image:userImage1,
      clientTag,
      clientType,
      teamMember,
      adminMember,
      inviteClient,
      inviteMessage,
    });

    // Save the new client to the database
    const savedClient = await newClient.save();

    // Send invitation email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "mominumer764@gmail.com",
        pass: "imag mpla xuic xtui",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "mominumer764@gmail.com",
      to: inviteClient, // Assuming inviteClient is the email address
      subject: "Invitation to join our platform",
      text: `You have been invited to join our platform. Click the following link to get started: http://localhost:3000/invitation`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
          message: "An error occurred while sending the email.",
          status: "error",
        });
      } else {
        console.log("Email sent:", info.response);
        return res.status(201).json(savedClient);
      }
    });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


