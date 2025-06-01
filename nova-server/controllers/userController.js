const User = require("../models/User");

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
    const { name, email, roles, permissions } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.roles = roles || user.roles;
    user.permissions = permissions || user.permissions;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      roles: updatedUser.roles,
      permissions: updatedUser.permissions,
    });
  } catch (error) {
    console.error("Error updating user:", error);
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

    const users = await User.find({}).select("-password");
    res.status(200).json({ users });
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get current logged-in user
// @route   GET /api/users/me
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
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
  getAllUsers,
  deleteUserById,
  getMe,
};
