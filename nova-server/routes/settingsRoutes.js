const express = require("express");
const router = express.Router();
const {
  createSiteSettings,
  getSiteSettings,
  updateSiteSettings,
} = require("../controllers/settingsController");

router.post("/", createSiteSettings);
router.get("/", getSiteSettings);
router.patch("/:id", updateSiteSettings);

module.exports = router;
