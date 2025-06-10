const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    bio: {
      type: String,
      default: "",
      maxlength: 500, // Optional constraint
    },
    password: {
      type: String,
      required: true,
      select: false, // Hides password by default
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

    // roles: {
    //   type: [String],
    //   enum: ["admin", "editor", "user", "moderator"],
    //   default: ["user"],
    // },
    // permissions: {
    //   type: [String],
    //   enum: ["create_post", "edit_post", "view_stats", "view_post"],
    //   default: ["create_post"],
    // },
    refreshToken: {
      type: String,
      default: "",
    },
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // Hash the password before saving it to the database
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
