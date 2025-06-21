const express = require("express");

const {
  loginUser,
  registerUser,
  refreshTokenHandler,
  logoutUser,
  googleSignUpController,
  googleAuthController,
  facebookAuthController,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/refresh", refreshTokenHandler);
router.post("/logout", logoutUser);
router.post("/oauth/google", googleAuthController);
router.post("/oauth/google-signup", googleSignUpController);
router.post("/oauth/facebook", facebookAuthController);

module.exports = router;
