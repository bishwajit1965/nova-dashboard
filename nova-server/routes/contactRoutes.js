const express = require("express");
const router = express.Router();
const {
  sendContactMessage,
  getAllContactMessages,
  deleteContactMessage,
  toggleReadStatus,
} = require("../controllers/contactController");

router.get("/contacts", getAllContactMessages);
router.post("/contact", sendContactMessage);
router.delete("/contacts/:id", deleteContactMessage);
router.patch("/contacts/:id/read", toggleReadStatus);

module.exports = router;
