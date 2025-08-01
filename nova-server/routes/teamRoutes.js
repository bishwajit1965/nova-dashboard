const express = require("express");
const router = express.Router();
const {
  createTeam,
  getRolesForTeam,
  getTeamMembers,
  inviteUserToTeam,
  updateTeamMemberRole,
  removeMemberFromTeam,
} = require("../controllers/teamController");

const { protect } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");
const authorizePermissions = require("../middlewares/authorizePermissions");

router.get("/team-members/:teamId", protect, getTeamMembers);
router.get("/:teamId/roles", protect, getRolesForTeam);
router.post(
  "/create",
  protect,
  authorizeRoles("admin", "owner"),
  authorizePermissions("create_team"),
  createTeam
);
router.post("/invite", protect, inviteUserToTeam);
router.patch(
  "/team-members/:id/role",
  protect,
  authorizeRoles("admin"),
  updateTeamMemberRole
);
router.delete(
  "/team-members/:id",
  protect,
  authorizeRoles("admin"),
  removeMemberFromTeam
);

module.exports = router;
