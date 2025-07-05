const express = require("express");

const router = express.Router();

const { getAllAuditLogs } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");
const authorizePermissions = require("../middlewares/authorizePermissions");

router.get(
  "/",
  protect,
  authorizeRoles("admin", "editor"),
  authorizePermissions("edit_post"),
  getAllAuditLogs
);

module.exports = router;
