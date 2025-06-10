const Permission = require("../models/Permission");

const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find({});
    console.log("Fetched permissions:", permissions); // ✅ log
    res.status(200).json({
      success: true,
      message: "Permissions fetched successfully.",
      data: permissions,
    });
  } catch (error) {
    console.error("Error encountered while fetching permissions:", error);
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
      data: permission,
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
      data: updated,
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
  console.log("ID>", req.params.id);
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Permission deleted successfully.",
      data: permission,
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
