const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      required: true,
      default: "Nova Dashboard",
    },
    contactEmail: {
      type: String,
      default: "",
    },
    supportPhone: {
      type: String,
      default: "",
    },
    footerText: {
      type: String,
      default: "",
    },
    logoUrl: {
      type: String,
      default: "", // URL to uploaded logo (optional enhancement)
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);
