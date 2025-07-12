const express = require("express");
const router = express.Router();
const {
  subscribe,
  getAllSubscribers,
  removeNewsLetter,
} = require("../controllers/newsletterController");

const { protect } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

// Public subscription
router.post("/subscribe", subscribe);
router.get("/", getAllSubscribers);

// Admin (role: admin or editor as you prefer)
router.use(protect);
router.use(authorizeRoles("admin"));

// Admin - view all subscribers (you can add protect middleware)
router.delete("/:id", removeNewsLetter);

module.exports = router;
