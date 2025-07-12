const express = require("express");
const router = express.Router();

// const multer = require("multer");
const upload = require("../config/multer");
const {
  getPublicSiteSettings,
  createSiteSettings,
  getSiteSettings,
  updateSiteSettings,
} = require("../controllers/settingsController");

// const upload = multer({ dest: "uploads/logos" });
const { protect } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

// ✅ Public route — for landing page, branding, footer
router.get("/public", getPublicSiteSettings);

//✅ Admin routes — protect & authorize
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  upload.single("logo"),
  createSiteSettings
);
// router.post("/", protect, authorizeRoles("admin"), createSiteSettings);
router.get("/", protect, authorizeRoles("admin"), getSiteSettings);

// PATCH /settings/:id  (send JSON or multipart/form‑data)
router.patch(
  "/:id",
  protect,
  authorizeRoles("admin"),
  upload.single("logo"),
  updateSiteSettings
);

// router.patch("/:id", protect, authorizeRoles("admin"), updateSiteSettings);

module.exports = router;
