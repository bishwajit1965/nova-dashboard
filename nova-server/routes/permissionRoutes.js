const express = require("express");
const router = express.Router();

const {
  getAllPermissions,
  createPermission,
  updatePermission,
  deletePermission,
} = require("../controllers/permissionController");

const { protect } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");
const authorizePermissions = require("../middlewares/authorizePermissions");

// Apply middlewares
router.use(protect);
router.use(authorizeRoles("admin"));
router.use(authorizePermissions("edit_post"));

// Base path: /permissions
router.route("/").get(getAllPermissions).post(createPermission);

router.route("/:id").patch(updatePermission).delete(deletePermission);

module.exports = router;
