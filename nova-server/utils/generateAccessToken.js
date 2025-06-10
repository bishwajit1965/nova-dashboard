const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  // Handles both ObjectId and string
  const roles = user.roles.map((role) =>
    typeof role === "string" ? role : role.name
  );
  const permissions = user.permissions.map((perm) =>
    typeof perm === "string" ? perm : perm.name
  );

  return jwt.sign(
    {
      userId: user._id,
      name: user.name,
      email: user.email,
      roles,
      permissions,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "1d" }
  );
};

module.exports = generateAccessToken;
