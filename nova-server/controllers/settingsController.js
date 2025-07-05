const SiteSettings = require("../models/SiteSettings");

const createSiteSettings = async (req, res) => {
  try {
    const settings = await SiteSettings.create(req.body);
    res.status(201).json({ message: "Site settings created", data: settings });
  } catch (error) {
    console.error("Error creating settings:", error);
    res.status(500).json({ message: "Error creating settings" });
  }
};

const getSiteSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();

    // If not found, create default one
    if (!settings) {
      settings = await SiteSettings.create({});
    }

    res.status(200).json({
      success: true,
      message: "Site settings data is fetched successfully!",
      data: settings,
    });
  } catch (err) {
    console.error("Settings fetch error:", err);
    res.status(500).json({ message: "Failed to fetch site settings" });
  }
};

const updateSiteSettings = async (req, res) => {
  const { id } = req.params;

  const updatedData = req.body;
  console.log("Data =>", updatedData);
  if (!id || !updatedData) {
    return res.status(400).json({ message: "ID and data are required." });
  }
  try {
    const updatedSettings = await SiteSettings.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!updatedSettings) {
      return res.status(404).json({ message: "Settings not found." });
    }
    res.status(200).json({
      success: true,
      message: "Site settings updated",
      data: updatedSettings,
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({ message: "Error updating settings" });
  }
};

module.exports = {
  createSiteSettings,
  getSiteSettings,
  updateSiteSettings,
};
