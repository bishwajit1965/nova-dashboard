const User = require("../models/User");
const Plan = require("../models/Plan");
const bcrypt = require("bcrypt");
const logAudit = require("../utils/logAudit");
const AuditLog = require("../models/AuditLog");

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Failed to get user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, roles, permissions, bio } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.roles = roles || user.roles;
    user.permissions = permissions || user.permissions;
    user.bio = bio !== undefined ? bio : user.bio;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      roles: updatedUser.roles,
      permissions: updatedUser.permissions,
      bio: updatedUser.bio,
    });

    // After updating the user
    await logAudit({
      userId: req.user._id, // or however you're tracking the actor
      action: "Updated User",
      entityType: "User",
      entityId: updatedUser._id,
      details: `Updated user name to ${updatedUser.name}`,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserPlan = async (req, res) => {
  const userId = req.user.id || req.user._id;
  const { planId } = req.body;
  if (!planId) {
    return res.status(400).json({ message: "Plan ID is required" });
  }

  try {
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { plan: planId },
      { new: true }
    ).populate({
      path: "plan",
      populate: { path: "features" },
    });

    res.status(200).json({
      success: true,
      message: "Plan selected successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating plan:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const removeUserPlan = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $unset: { plan: 1 } }, // MongoDB $unset removes the key
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Plan removed successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error removing plan:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllAuditLogs = async (req, res) => {
  try {
    const auditLogs = await AuditLog.find({})
      .populate({
        path: "userId",
        select: "name email roles permissions",
        populate: [
          { path: "roles", select: "name description" },
          { path: "permissions", select: "name description" },
        ],
      })
      .sort({ timestamp: -1 })
      .limit(100);
    console.log("Audit log", auditLogs);
    res.status(200).json({
      success: true,
      message: "Audit log fetched successfully",
      data: auditLogs,
    });
  } catch (error) {}
};

const updateCurrentUserProfile = async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    console.log("Decoded user in req.user →", req.user);
    console.log("User ID we are trying to fetch →", req.user.userId);
    console.log("User ID we are trying to fetch by _id →", req.user._id);

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User data=>", user);
    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio !== undefined ? bio : user.bio;
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      bio: updatedUser.bio,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    if (!req.user.roles?.includes("admin")) {
      return res.status(403).json({ message: "Access denied" });
    }
    const users = await User.find({})
      .select("-password")
      .populate("roles", "name")
      .populate("permissions", "name")
      .populate({
        path: "plan",
        select: "tier name features price createdAt updatedAt",
        populate: { path: "features" }, // populate the referenced features
      });
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("+password")
      .populate("roles", "name")
      .populate("permissions", "name")
      .populate({
        path: "plan",
        select: "tier name features price createdAt updatedAt",
        populate: { path: "features" }, // populate the referenced features
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMyPlan = async (req, res) => {
  try {
    // const user = await User.findById(req.user._id).populate("plan");
    const userId = req.user.userId || req.user._id; // works either way
    const user = await User.findById(userId)
      .populate("roles", "name")
      .populate("permissions", "name")
      .populate({
        path: "plan",
        select: "tier name features price createdAt updatedAt",
        populate: { path: "features" }, // populate the referenced features
      });
    console.log("USER ID=>", user);

    if (!user || !user.plan) {
      return res.status(404).json({ message: "No plan is assigned." });
    }

    res.status(200).json({
      success: true,
      message: "User with plan is fetched successfully.",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error in fetching user with plan." });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Current password is incorrect!" });
    }

    user.password = newPassword; // ✅ plain text assignment only
    user.refreshToken = ""; // ✅ reset token
    await user.save(); // ✅ pre-save hook hashes it
    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Password change error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const updateUserRolesPermissions = async (req, res) => {
  const { roles, permissions } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { roles, permissions },
    { new: true }
  );
  res.json(user);
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Failed to delete user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserById,
  updateUserById,
  updateUserPlan,
  removeUserPlan,
  getAllAuditLogs,
  updateCurrentUserProfile,
  getAllUsers,
  getMe,
  getMyPlan,
  changePassword,
  updateUserRolesPermissions,
  deleteUserById,
};
