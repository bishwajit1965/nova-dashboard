const express = require("express");
const router = express.Router();
const {
  getRoleDistribution,
  getPlanSignUpsOverview,
  getBillingSummary,
  getRecentPlanChanges,
} = require("../controllers/adminController");

const { protect } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");
const authorizePermissions = require("../middlewares/authorizePermissions");

router.get(
  "/role-distribution",
  protect,
  authorizeRoles("admin"),
  getRoleDistribution
);

router.get("/plan-signUps", getPlanSignUpsOverview);

router.get("/billing-summary", getBillingSummary);

router.get("/recent-plan-changes", getRecentPlanChanges);

module.exports = router;
