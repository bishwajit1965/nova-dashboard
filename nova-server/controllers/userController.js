const User = require("../models/User");
const bcrypt = require("bcrypt");

// @desc    Get user by ID
// @route   GET /api/users/:id
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

// @desc    Update user by ID (admin only)
// @route   PUT /api/users/:id
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
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateCurrentUserProfile = async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    console.log("Decoded user in req.user →", req.user);
    console.log("User ID we are trying to fetch →", req.user.userId);
    console.log("User ID we are trying to fetch by _id →", req.user._id);

    const user = await User.findById(req.user);
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

// @desc    Get all users (admin only)
// @route   GET /api/users
const getAllUsers = async (req, res) => {
  try {
    if (!req.user.roles?.includes("admin")) {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find({})
      .select("-password")
      .populate("roles")
      .populate("permissions");
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get current logged-in user
// @route   GET /api/users/me
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    res.status(500).json({ message: "Server error" });
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

// @desc    Delete user by ID (admin only)
// @route   DELETE /api/users/:id
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
  updateCurrentUserProfile,
  getAllUsers,
  getMe,
  changePassword,
  updateUserRolesPermissions,
  deleteUserById,
};
