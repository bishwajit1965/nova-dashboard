const Role = require("../models/Role");
const Permission = require("../models/Permission"); // ✅ this line is mandatory

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");
    console.log("Roles in controller", roles);

    res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (error) {
    console.error("Error fetching roles:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error in fetching roles.",
    });
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id).populate("permissions");

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    res.json({ success: true, role });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in fetching role by ID.",
      error,
    });
  }
};

const createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in creating roles.",
      error,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("permissions");
    res.status(200).json({
      success: true,
      message: " Role updated successfully",
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in updating role.",
      error,
    });
  }
};

const assignPermissionsToRole = async (req, res) => {
  try {
    const { permissions } = req.body;
    const { id } = req.params;

    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { permissions },
      { new: true }
    ).populate("permissions");

    if (!updatedRole) {
      return res.status(404).json({
        success: false,
        message: "Role not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Permissions assigned to role successfully.",
      role: updatedRole,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in assigning permissions.",
      error,
    });
  }
};

const deleteRole = async (req, res) => {
  console.log("Delete role is hit");
  try {
    const id = req.params.id;
    const role = await Role.findByIdAndDelete(id);
    console.log("Role=>", role);
    if (!role)
      return res
        .status(404)
        .json({ success: false, message: "Role not found." });
    res
      .status(200)
      .json({ success: true, message: "Role deleted successfully." });
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  assignPermissionsToRole,
};
