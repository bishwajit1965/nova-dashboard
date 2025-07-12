const SiteSettings = require("../models/SiteSettings");
const path = require("path");
const fs = require("fs");

// Public (for site use, branding, etc)
const getPublicSiteSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne().lean();
    if (!settings) settings = await SiteSettings.create({});

    // Return only public-facing fields
    const { siteName, contactEmail, supportPhone, footerText, logoUrl } =
      settings;

    res.status(200).json({
      siteName,
      contactEmail,
      supportPhone,
      footerText,
      logoUrl,
    });
  } catch (err) {
    console.error("Settings fetch error:", err);
    res.status(500).json({ message: "Failed to fetch site settings" });
  }
};

const createSiteSettings = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.logoUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
    }

    /* ——— single‑document guard policy ——— */
    const alreadyExists = await SiteSettings.findOne({});
    if (alreadyExists) {
      return res
        .status(400)
        .json({ message: "Settings already exists! Update instead." });
    }

    const settingCreated = await SiteSettings.create(data);

    res.status(201).json({
      success: true,
      message: "Site settings created",
      data: settingCreated,
    });
  } catch (err) {
    console.error("Error creating site settings:", err);
    res.status(500).json({ message: "Error creating site settings" });
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
  try {
    const { id } = req.params;

    const existingSettings = await SiteSettings.findById(id);

    if (!existingSettings)
      return res.status(404).json({ message: "Settings data not found." });

    const updateData = { ...req.body };

    let imagePath = existingSettings.logoUrl;

    if (req.file) {
      imagePath = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
      // imagePath = `/uploads/${req.file.filename}`;

      const previousImagePath = path.join(
        __dirname,
        "../uploads",
        path.basename(existingSettings.logoUrl)
      );

      try {
        if (fs.existsSync(previousImagePath)) {
          fs.unlinkSync(previousImagePath);
        }
      } catch (err) {
        console.error("Error deleting old image:", err);
      }
    }

    if (req.file) {
      updateData.logoUrl = imagePath;
    } else {
      delete updateData.logoUrl;
    }

    const updated = await SiteSettings.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Site settings updated",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating site settings." });
  }
};

module.exports = {
  getPublicSiteSettings,
  createSiteSettings,
  getSiteSettings,
  updateSiteSettings,
};
