const express = require("express");
const router = express.Router();
const {
  createPlan,
  getPlans,
  updateMyPlan,
  updatePlan,
  deletePlan,
} = require("../controllers/planController");
const { protect } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/", getPlans);
router.post("/", createPlan);
router.put("/plan", protect, updateMyPlan);
router.patch("/:id", updatePlan);
router.delete("/:id", deletePlan);

module.exports = router;
