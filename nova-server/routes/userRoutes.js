const express = require("express");
const router = express.Router();
const {
  getMe,
  getMyPlan,
  getUserById,
  updateUserById,
  removeUserPlan,
  updateUserPlan,
  updateCurrentUserProfile,
  changePassword,
  deleteUserById,
  updateUserRolesPermissions,
  getAllUsers,
} = require("../controllers/userController");

const { protect } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");
const authorizePermissions = require("../middlewares/authorizePermissions");

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
  authorizeRoles("admin", "editor", "user"),
  updateCurrentUserProfile
);

router.put(
  "/change-password",
  protect,
  authorizeRoles("admin"),
  changePassword
);

router.patch(
  "/plan",
  protect,
  authorizeRoles("user", "editor"),
  updateUserPlan
);
router.get("/me", protect, getMe);
router.get("/me/plan", protect, authorizeRoles("user", "editor"), getMyPlan);
router.get("/:id", protect, authorizeRoles("admin"), getUserById);
router.patch("/:id", protect, authorizeRoles("admin"), updateUserById);
router.patch(
  "/:id/roles-permissions",
  protect,
  authorizeRoles("admin"),
  updateUserRolesPermissions
);

router.delete(
  "/plan",
  protect,
  authorizeRoles("user", "editor"), // or just protect
  removeUserPlan
);

router.delete("/:id", protect, authorizeRoles("admin"), deleteUserById);

module.exports = router;
