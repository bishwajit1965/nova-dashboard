const User = require("../models/User");

const Plan = require("../models/Plan");

const getRoleDistribution = async (req, res) => {
  try {
    const roleDistribution = await User.aggregate([
      {
        $lookup: {
          from: "roles", // must match your actual collection name
          localField: "roles",
          foreignField: "_id",
          as: "rolesData",
        },
      },
      { $unwind: "$rolesData" },
      {
        $group: {
          _id: "$rolesData.name",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value: "$count",
        },
      },
    ]);

    res.status(200).json(roleDistribution);
  } catch (err) {
    console.error("Error getting role distribution", err);
    res.status(500).json({ error: "Server error" });
  }
};
// controllers/adminController.js
const getPlanSignUpsOverview = async (req, res) => {
  try {
    const results = await User.aggregate([
      {
        $lookup: {
          from: "plans",
          localField: "plan",
          foreignField: "_id",
          as: "planData",
        },
      },
      { $unwind: "$planData" },
      {
        $group: {
          _id: "$planData.name",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: "$_id",
          value: "$count",
          _id: 0,
        },
      },
    ]);

    res.json(results);
  } catch (error) {
    console.error("Error in plan sign-ups overview:", error);
    res.status(500).json({ message: "Failed to fetch plan sign-ups overview" });
  }
};

const getBillingSummary = async (req, res) => {
  try {
    const users = await User.find().populate("plan", "name price");
    const planSummary = {};

    users.forEach((user) => {
      if (user.plan) {
        const planName = user.plan.name;
        const price = user.plan.price || 0;

        if (!planSummary[planName]) {
          planSummary[planName] = {
            count: 0,
            totalRevenue: 0,
          };
        }

        planSummary[planName].count += 1;
        planSummary[planName].totalRevenue += price;
      }
    });

    const result = Object.entries(planSummary).map(([name, stats]) => ({
      name,
      users: stats.count,
      revenue: stats.totalRevenue,
    }));

    const totalRevenue = result.reduce((acc, curr) => acc + curr.revenue, 0);

    res.status(200).json({
      success: true,
      totalRevenue,
      plans: result,
    });
  } catch (error) {
    console.error("Billing Summary Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error in generating billing summary",
    });
  }
};

const getRecentPlanChanges = async (req, res) => {
  try {
    // Fetch users with a plan and sort by updatedAt (limit to recent 10)
    const users = await User.find({ plan: { $ne: null } })
      .sort({ updatedAt: -1 })
      .limit(10)
      .populate("plan", "name")
      .select("name plan updatedAt");

    const recentChanges = users.map((user) => ({
      userName: user.name,
      action: "upgraded to",
      planName: user.plan?.name || "Deleted Plan",
      timestamp: user.updatedAt,
    }));

    return res.status(200).json(recentChanges);
  } catch (error) {
    console.error("Error fetching recent plan changes:", error);
    res.status(500).json({ message: "Server error retrieving plan changes" });
  }
};

module.exports = {
  getRoleDistribution,
  getPlanSignUpsOverview,
  getBillingSummary,
  getRecentPlanChanges,
};
