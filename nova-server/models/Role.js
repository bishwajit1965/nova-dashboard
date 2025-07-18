const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model("Role", rolesSchema);

module.exports = Role;
