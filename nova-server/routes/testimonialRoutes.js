const express = require("express");
const router = express.Router();
const {
  getTestimonialsPublished,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  removeTestimonial,
} = require("../controllers/testimonialController");

const { protect } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

// Public
router.get("/public", getTestimonialsPublished);

// Admin (role: admin or editor as you prefer)
router.use(protect);
router.use(authorizeRoles("admin"));

router.get("/", getAllTestimonials);
router.post("/", createTestimonial);
router.patch("/:id", updateTestimonial);
router.delete("/:id", removeTestimonial);

module.exports = router;
