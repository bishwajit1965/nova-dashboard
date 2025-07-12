const Plan = require("../models/Plan");
const Feature = require("../models/Feature");
const User = require("../models/User");

// POST new plan
const createPlan = async (req, res) => {
  const { tier, name, price, features } = req.body;

  if (!tier || !name || price == null || !features?.length) {
    return res
      .status(400)
      .json({ message: "Tier, name, price, and features are required" });
  }

  try {
    const featureDocs = await Feature.find({ key: { $in: features } });
    const featureIds = featureDocs.map((f) => f._id);

    const plan = await Plan.create({
      tier: tier.toLowerCase().trim(),
      name,
      price,
      features: featureIds,
    });

    console.log("✅ Plan created:", plan);
    res
      .status(201)
      .json({ success: true, message: "Plan created", data: plan });
  } catch (error) {
    console.error("❌ Error creating plan:", error);
    res.status(500).json({ message: "Failed to create plan" });
  }
};

// GET all plans
const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find()
      .populate("features") // ✅ Now this works
      .sort({ price: 1 });
    res.status(200).json({ success: true, data: plans });
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ message: "Failed to fetch plans" });
  }
};

// From landing page a logged user can select a plan and then can choose another one
const updateMyPlan = async (req, res) => {
  try {
    const userId = req.user._id;
    const planId = req.body;
    console.log("User Id", userId);
    console.log("Plan Id", planId);
    if (!planId)
      return res
        .status(400)
        .json({ success: false, message: "Plan ID is required!" });
    const plan = await Plan.findById(planId);
    console.log("Plan data", plan);
    if (!plan)
      res.status(400).json({ success: false, message: "Plan is not found!" });
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { plan: plan._id },
      { new: true }
    ).populate("plan");
    res.status(200).json({
      success: true,
      message: "plan updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error in updating plan!", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

// PATCH update plan
const updatePlan = async (req, res) => {
  const { id } = req.params;
  const { tier, name, price, features } = req.body;

  try {
    // Find Feature IDs for given keys
    const featureDocs = await Feature.find({ key: { $in: features } });
    const featureIds = featureDocs.map((f) => f._id);

    const updatedPlan = await Plan.findByIdAndUpdate(
      id,
      {
        tier,
        name,
        price,
        features: featureIds, // <-- use ObjectIds here!
      },
      { new: true }
    ).populate("features");

    res.status(200).json(updatedPlan);
  } catch (error) {
    console.error("Error updating plan:", error);
    res.status(500).json({ message: "Server error" });
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
  createPlan,
  getPlans,
  updateMyPlan,
  updatePlan,
  deletePlan,
};
