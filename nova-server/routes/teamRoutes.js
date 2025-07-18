const express = require("express");
const router = express.Router();
const {
  createTeam,
  getRolesForTeam,
  inviteUserToTeam,
} = require("../controllers/teamController");

const { protect } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");
const authorizePermissions = require("../middlewares/authorizePermissions");

router.get("/:teamId/roles", protect, getRolesForTeam);

router.post(
  "/create",
  protect,
  authorizeRoles("admin"),
  authorizePermissions("create_team"),
  createTeam
);
router.post("/invite", protect, inviteUserToTeam);

module.exports = router;
