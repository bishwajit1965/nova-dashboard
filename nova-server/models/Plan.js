const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    tier: {
      type: String,
      enum: ["free", "pro", "premium", "enterprise"],
      required: true,
      unique: true, // one document per tier
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    features: {
      type: [String], // array of feature strings
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plan", planSchema);
