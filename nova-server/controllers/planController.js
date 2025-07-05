const Plan = require("../models/Plan");

// POST new plan
const createPlan = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Missing request body" });
  }
  const { tier, name, price, features } = req.body;

  if (!tier || !name || !price || !features?.length) {
    return res
      .status(400)
      .json({ message: "Tier name price and feature fields are required" });
  }

  try {
    const plan = await Plan.create({
      tier: tier.toLowerCase().trim(),
      name,
      price,
      features,
    });
    console.log("Plan data", plan);
    res
      .status(201)
      .json({ success: true, message: "Plan created", data: plan });
  } catch (error) {
    console.error("Error creating plan:", error);
    res.status(500).json({ message: "Failed to create plan" });
  }
};

// GET all plans
const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ price: 1 });
    res.status(200).json({ success: true, data: plans });
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ message: "Failed to fetch plans" });
  }
};

// PATCH update plan
const updatePlan = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const plan = await Plan.findByIdAndUpdate(id, updatedData, { new: true });
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    res
      .status(200)
      .json({ success: true, message: "Plan updated", data: plan });
  } catch (error) {
    console.error("Error updating plan:", error);
    res.status(500).json({ message: "Failed to update plan" });
  }
};

// DELETE a plan
const deletePlan = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Plan.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: "Plan not found" });

    res.status(200).json({ success: true, message: "Plan deleted" });
  } catch (error) {
    console.error("Error deleting plan:", error);
    res.status(500).json({ message: "Failed to delete plan" });
  }
};

module.exports = {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
};
