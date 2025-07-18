const mongoose = require("mongoose");
const crypto = require("crypto");

const inviteSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    accepted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

inviteSchema.methods.generateToken = function () {
  const rawToken = crypto.randomBytes(32).toString("hex");
  this.token = crypto.createHash("sha256").update(rawToken).digest("hex");
  this.expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes validity

  return rawToken;
};
const Invite = mongoose.model("Invite", inviteSchema);
module.exports = Invite;
