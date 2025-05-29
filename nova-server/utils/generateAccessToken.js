const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      name: user.name,
      email: user.email,
      roles: Array.isArray(user.roles) ? user.roles : ["user"],
      permissions: Array.isArray(user.permissions)
        ? user.permissions
        : ["create_post"],
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m" }
  );
};

module.exports = generateAccessToken;
