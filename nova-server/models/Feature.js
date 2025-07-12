const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // e.g. "user-management"
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "Circle" }, // Lucide icon name
  },
  {
    timestamps: true,
  }
);

const Feature = mongoose.model("Feature", featureSchema);

module.exports = Feature;
