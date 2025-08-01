// routes/billing.js
const express = require("express");
const router = express.Router();
const { mockCheckout } = require("../controllers/billingController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/mock-checkout", protect, mockCheckout);

module.exports = router;
