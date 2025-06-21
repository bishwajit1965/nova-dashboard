const nodemailer = require("nodemailer");
const ContactMessage = require("../models/ContactMessage");

const sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: "New Contact Message from Nova Dashboard",
      html: `
        <h3>Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await ContactMessage.create({ name, email, message });
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    res
      .status(500)
      .json({ message: "Failed to send message. Try again later." });
  }
};

const getAllContactMessages = async (req, res) => {
  try {
    const contacts = await ContactMessage.find({}).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      message: "Contact messages fetched successfully!",
      data: contacts,
    });
  } catch (err) {
    console.error("Fetch messages error:", err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

const deleteContactMessage = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Message ID is required." });
  }

  try {
    const deletedMessage = await ContactMessage.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found." });
    }
    res.status(200).json({
      success: true,
      message: "Contact message deleted successfully!",
      data: deletedMessage,
    });
  } catch (err) {
    console.error("Delete message error:", err);
    res.status(500).json({ message: "Failed to delete message" });
  }
};

const toggleReadStatus = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Message ID is required." });
  }

  try {
    const message = await ContactMessage.findById(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found." });
    }
    console.log("Found message:", message);
    message.read = !message.read;
    await message.save();

    res.status(200).json({
      success: true,
      message: "Contact message read status updated successfully!",
      data: message,
    });
  } catch (err) {
    console.error("Toggle read status error:", err);
    res.status(500).json({ message: "Failed to update read status" });
  }
};

module.exports = {
  sendContactMessage,
  getAllContactMessages,
  deleteContactMessage,
  toggleReadStatus,
};
