const express = require("express");

const {
  loginUser,
  logoutUser,
  refreshTokenHandler,
  registerUser,
} = require("../controllers/authController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refresh", refreshTokenHandler);
router.post("/logout", logoutUser);

module.exports = router;
