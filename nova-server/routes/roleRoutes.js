const express = require("express");
const router = express.Router();

const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  assignPermissionsToRole,
} = require("../controllers/roleController");

const { protect } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");
const authorizePermissions = require("../middlewares/authorizePermissions");

router.use(protect);
router.use(authorizeRoles("admin"));
router.use(authorizePermissions("edit_post"));

// ROUTES
router.route("/").get(getAllRoles).post(createRole);

router.route("/:id").get(getRoleById).patch(updateRole).delete(deleteRole);

// Special route for assigning permissions
router.patch("/:id/permissions", assignPermissionsToRole);

module.exports = router;
