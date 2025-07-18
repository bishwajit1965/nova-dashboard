const express = require("express");
const router = express.Router();

const {
  sendTeamInvite,
  acceptInvite,
} = require("../controllers/inviteController");

router.post("/send", sendTeamInvite); // e.g. POST /api/invite/send
router.post("/accept/:token", acceptInvite); // e.g. POST /api/invite/accept/:token

module.exports = router;
