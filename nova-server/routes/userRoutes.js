const express = require("express");
const router = express.Router();
const {
  getMe,
  getUserById,
  updateUserById,
  deleteUserById,
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
router.get("/me", protect, getMe);
router.get("/:id", protect, authorizeRoles("admin"), getUserById);
router.put("/:id", protect, authorizeRoles("admin"), updateUserById);
router.delete("/:id", protect, authorizeRoles("admin"), deleteUserById);

module.exports = router;
