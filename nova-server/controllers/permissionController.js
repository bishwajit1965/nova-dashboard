const Permission = require("../models/Permission");

const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json({
      success: true,
      message: "Permissions fetched successfully.",
      data: permissions,
    });
  } catch (error) {
    console.error("Error encountered.", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching permissions.",
    });
  }
};

const createPermission = async (req, res) => {
  console.log("Permission create controller method is hit");
  try {
    const permission = await Permission.create(req.body);
    console.log("PERMISSION DATA", permission);
    res.status(201).json({
      success: true,
      message: "Permission created successfully.",
      permission,
    });
  } catch (error) {
    console.error("Error encountered.", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while creating permission.",
    });
  }
};

const updatePermission = async (req, res) => {
  try {
    const updated = await Permission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Permission updated successfully.",
      permission: updated,
    });
  } catch (error) {
    console.error("Error encountered.", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while updating permission.",
    });
  }
};

const deletePermission = async (req, res) => {
  console.log("Permission deletePermission controller method is hit");
  console.log("ID+>", req.params.id);
  try {
    await Permission.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Permission deleted successfully.",
    });
  } catch (error) {
    console.error("Error encountered.", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while deleting permission.",
    });
  }
};

module.exports = {
  getAllPermissions,
  createPermission,
  updatePermission,
  deletePermission,
};
