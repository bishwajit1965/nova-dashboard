const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  console.log("🔐 protect middleware reached"); // Add this first
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("User token:", token);
      console.log("Decoded token->", jwt.decode(token));
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("object decoded:", decoded);

      req.user = await User.findById(decoded.userId).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }
      // Optional: use decoded directly (skip DB lookup)
      req.user = {
        _id: decoded.userId,
        name: decoded.name,
        email: decoded.email,
        roles: decoded.roles,
        permissions: decoded.permissions,
      };
      console.log("🧾 Roles in decoded token:", decoded.roles);
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
