const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // password: {
    //   type: String,
    //   required: true,
    //   select: false, // Hides password by default
    // },
    password: {
      type: String,
      required: function () {
        return this.provider === "local";
      },
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      default: null,
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null },
    bio: {
      type: String,
      default: "",
      maxlength: 500, // Optional constraint
    },
    provider: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],

    refreshToken: {
      type: String,
      default: "",
    },
    acceptedTerms: {
      type: Boolean,
      // required: true,
    },
    acceptedAt: {
      type: Date,
      default: Date.now,
    },
    termsVersion: {
      type: String,
      default: "v1.0",
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    signupIp: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  // This is a placeholder for password matching logic
  // In a real application, you would use bcrypt or another library to compare hashed passwords
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken;
};

userSchema.pre("save", async function (next) {
  // Only hash if the password exists and has been modified
  if (!this.password || !this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
