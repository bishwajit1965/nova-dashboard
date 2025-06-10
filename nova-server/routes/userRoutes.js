const express = require("express");
const router = express.Router();
const {
  getMe,
  getUserById,
  updateUserById,
  updateCurrentUserProfile,
  changePassword,
  deleteUserById,
  updateUserRolesPermissions,
  getAllUsers,
} = require("../controllers/userController");

const { protect } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");
const authorizePermissions = require("../middlewares/authorizePermissions");

router.get(
  "/", // <-- this is the route
  protect,
  authorizeRoles("admin"),
  authorizePermissions("edit_post"),
  getAllUsers
);

router.get("/public", getAllUsers);

// ADMIN ONLY: All users list
router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  authorizePermissions("edit_post"),
  getAllUsers
);

// MOST SPECIFIC ROUTES FIRST
router.patch(
  "/profile",
  protect,
  authorizeRoles("admin"),
  updateCurrentUserProfile
);
router.put(
  "/change-password",
  protect,
  authorizeRoles("admin"),
  changePassword
);
router.get("/me", protect, getMe);
router.get("/:id", protect, authorizeRoles("admin"), getUserById);
router.patch("/:id", protect, authorizeRoles("admin"), updateUserById);
router.patch(
  "/:id/roles-permissions",
  protect,
  authorizeRoles("admin"),
  updateUserRolesPermissions
);

router.delete("/:id", protect, authorizeRoles("admin"), deleteUserById);

module.exports = router;
