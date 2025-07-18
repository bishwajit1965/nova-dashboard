const User = require("../models/User.js");
const Role = require("../models/Role.js");
const Plan = require("../models/Plan.js");
const Permission = require("../models/Permission.js");
const jwt = require("jsonwebtoken");
const qs = require("qs"); // Make sure qs is installed
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail.js");

const generateAccessToken = require("../utils/generateAccessToken.js");
const { generateRefreshToken } = require("../utils/generateRefreshToken.js");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const userRole = await Role.findOne({ name: "user" });
    const defaultPlan = await Plan.findOne({ tier: "free" });
    const defaultPermissions = await Permission.find({
      name: { $in: ["create_post"] },
    });

    if (!userRole) {
      return res.status(500).json({ message: "Default role 'user' not found" });
    }

    let user = await User.create({
      name,
      email,
      password,
      roles: userRole ? [userRole._id] : [],
      permissions: defaultPermissions.map((p) => p._id),
      plan: defaultPlan ? defaultPlan._id : null,
      acceptedTerms: true,
      acceptedAt: new Date(),
      termsVersion: "v1.0", // change as you update your terms
      signupIp: req.ip, // ✅ stores IP
    });

    user = await User.findById(user._id)
      .populate("roles")
      .populate("permissions")
      .populate({
        path: "plan",
        select: "_id tier name features price createdAt updatedAt",
        populate: { path: "features" },
      });

    if (user) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user._id);

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(201).json({
        accessToken,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          roles: user.roles.map((r) => r.name),
          permissions: user.permissions.map((p) => p.name),
          plan: user.plan && {
            _id: user.plan._id,
            tier: user.plan.tier,
            features: user.plan.features,
            name: user.plan.name,
            price: user.plan.price,
          },
        },
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const googleSignUpController = async (req, res) => {
  console.log("Sign up with Google called");
  const { code } = req.body;
  console.log("👉 Received code:", code);

  if (!code) {
    return res.status(400).json({ message: "Missing authorization code" });
  }

  try {
    // ✅ Exchange code for token
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      qs.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: "postmessage",
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { id_token } = tokenResponse.data;
    if (!id_token) {
      return res.status(401).json({ message: "ID token not received" });
    }

    // ✅ Verify ID token
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId, picture } = payload;

    if (!email) {
      return res.status(400).json({ message: "Email not found in token" });
    }

    let user = await User.findOne({ email })
      .populate("roles")
      .populate("permissions")
      .populate({
        path: "plan",
        select: "_id tier name features price createdAt updatedAt",
        populate: { path: "features" },
      });

    console.log("GOOGLE USER", user);
    const userRole = await Role.findOne({ name: "user" });
    const defaultPlan = await Plan.findOne({ tier: "free" });
    const defaultPermissions = await Permission.find({
      name: { $in: ["create_post"] },
    });
    console.log("userRole found:", userRole);

    if (!user) {
      user = await User.create({
        name,
        email,
        password: null,
        googleId,
        avatar: picture,
        provider: "google",
        roles: userRole ? [userRole._id] : [],
        permissions: defaultPermissions.map((p) => p._id),
        plan: defaultPlan ? defaultPlan._id : null,
        acceptedTerms: true,
        acceptedAt: new Date(),
        termsVersion: "v1.0",
        signupIp: req.ip, // ✅ stores IP
      });

      user = await User.findById(user._id)
        .populate("roles")
        .populate("permissions")
        .populate({
          path: "plan",
          select: "_id tier name features price createdAt updatedAt",
          populate: { path: "features" },
        });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Google sign up is successful",
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        roles: user.roles.map((role) => role.name),
        permissions: user.permissions.map((perm) => perm.name),
        plan: user.plan && {
          _id: user.plan._id,
          tier: user.plan.tier,
          name: user.plan.name,
          price: user.plan.price,
          features: user.plan.features || [],
        },
      },
    });
  } catch (error) {
    console.error("❌ Google Sign-up Error:", error?.response?.data || error);
    return res.status(401).json({ message: "Google sign up failed" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select("+password")
      .populate("roles")
      .populate("permissions")
      .populate({
        path: "plan",
        select: "_id tier name features price createdAt updatedAt",
        populate: { path: "features" },
      });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    // ✅ Use updateOne to avoid Mongoose validation (like acceptedTerms)
    await User.updateOne({ _id: user._id }, { $set: { refreshToken } });
    // await user.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles.map((role) => role.name),
        permissions: user.permissions.map((permission) => permission.name),
        bio: user.bio,
        plan: user.plan && {
          _id: user.plan._id,
          tier: user.plan.tier,
          features: user.plan.features,
          name: user.plan.name,
          price: user.plan.price,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const refreshTokenHandler = async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    let user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    user = await User.findById(decoded.userId)
      .populate("roles")
      .populate("permissions")
      .populate({
        path: "plan",
        select: "_id tier name features price createdAt updatedAt",
        populate: { path: "features" },
      });

    const accessToken = generateAccessToken(user);
    return res.status(200).json({
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        roles: user.roles.map((role) => role.name),
        permissions: user.permissions.map((permission) => permission.name),
        bio: user.bio,
        plan: user.plan && {
          _id: user.plan._id,
          tier: user.plan.tier,
          features: user.plan.features,
          name: user.plan.name,
          price: user.plan.price,
        },
      },
    });
  } catch (err) {
    console.error("❌ Refresh failed:", err.message);
    return res
      .status(403)
      .json({ message: "Refresh token expired or invalid" });
  }
};

const googleAuthController = async (req, res) => {
  const { code } = req.body;

  try {
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      qs.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, id_token } = tokenResponse.data;

    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );

    const { email, name, picture, sub } = userInfo.data;
    // let user = await User.findOne({ email })
    //   .populate("roles")
    //   .populate( "permissions" );
    let user = await User.findOne({ email })
      .populate("roles")
      .populate("permissions")
      .populate({
        path: "plan",
        select: "_id tier name features price createdAt updatedAt",
        populate: { path: "features" },
      });

    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: picture,
        provider: "google",
        providerId: sub,
        password: null,
      });
    }

    // ✅ Generate access and refresh tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user._id);
    console.log("Access token=>", accessToken);
    user.refreshToken = refreshToken;
    await user.save();

    // ✅ Set refreshToken cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✅ Send access token + user info
    res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        roles: user.roles.map((role) => role.name),
        permissions: user.permissions.map((perm) => perm.name),
        plan: user.plan && {
          _id: user.plan._id,
          tier: user.plan.tier,
          name: user.plan.name,
          price: user.plan.price,
          features: user.plan.features || [],
        },

        // plan: {
        //   tier: user.plan?.tier ?? "free",
        //   features: user.plan?.features ?? [],
        // },
      },
    });
  } catch (error) {
    console.error(
      "Google login failed",
      error?.response?.data || error.message
    );
    res.status(401).json({ message: "Google login failed" });
  }
};

const facebookAuthController = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res
      .status(400)
      .json({ message: "Facebook access token is required" });
  }

  try {
    // Fetch Facebook user info
    const fbRes = await axios.get(`https://graph.facebook.com/me`, {
      params: {
        fields: "id,name,email,picture",
        access_token: token,
      },
    });

    const { email, name, id: facebookId, picture } = fbRes.data;

    if (!email) {
      return res.status(400).json({ message: "Email permission is required" });
    }

    // Lookup user
    let user = await User.findOne({ $or: [{ email }, { facebookId }] })
      .populate("roles")
      .populate("permissions")
      .populate({
        path: "plan",
        populate: { path: "features" },
      });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found, please sign up first" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    // Set cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Respond
    res.status(200).json({
      message: "Facebook login successful",
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || picture?.data?.url,
        roles: user.roles.map((r) => r.name),
        permissions: user.permissions.map((p) => p.name),
        plan: user.plan && {
          _id: user.plan._id,
          tier: user.plan.tier,
          name: user.plan.name,
          price: user.plan.price,
          features: user.plan.features.map((f) =>
            typeof f === "string" ? f : f.key
          ),
        },
      },
    });
  } catch (error) {
    console.error(
      "Facebook Login Error:",
      error.response?.data || error.message
    );
    return res.status(401).json({ message: "Facebook login failed" });
  }
};

const facebookSignUpController = async (req, res) => {
  const { token } = req.body;
  if (!token)
    return res.status(400).json({ message: "Facebook token required" });

  try {
    // 1. Get user info from Facebook
    const fbRes = await axios.get("https://graph.facebook.com/me", {
      params: {
        fields: "id,name,email,picture",
        access_token: token,
      },
    });

    const { email, name, id: facebookId, picture } = fbRes.data;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // 2. Check if user exists
    let user = await User.findOne({ email })
      .populate("roles")
      .populate("permissions")
      .populate({
        path: "plan",
        select: "_id tier name features price createdAt updatedAt",
        populate: { path: "features" },
      });

    const userRole = await Role.findOne({ name: "user" });
    const defaultPlan = await Plan.findOne({ tier: "free" });
    const defaultPermissions = await Permission.find({
      name: { $in: ["create_post"] },
    });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: null,
        facebookId,
        avatar: picture?.data?.url || null,
        provider: "facebook",
        roles: userRole ? [userRole._id] : [],
        permissions: defaultPermissions.map((p) => p._id),
        plan: defaultPlan ? defaultPlan._id : null,
        acceptedTerms: true,
        acceptedAt: new Date(),
        termsVersion: "v1.0",
        signupIp: req.ip, // ✅ stores IP
      });

      user = await User.findById(user._id)
        .populate("roles")
        .populate("permissions")
        .populate({
          path: "plan",
          select: "_id tier name features price createdAt updatedAt",
          populate: { path: "features" },
        });
    }

    // 3. Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 4. Send response
    res.status(200).json({
      message: "Facebook sign up successful",
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        roles: user.roles.map((r) => r.name),
        permissions: user.permissions.map((p) => p.name),
        plan: user.plan && {
          _id: user.plan._id,
          tier: user.plan.tier,
          name: user.plan.name,
          price: user.plan.price,
          features: user.plan.features || [],
        },
      },
    });
  } catch (error) {
    console.error("❌ Facebook Sign-up Error:", error?.response?.data || error);
    return res.status(500).json({ message: "Facebook sign up failed" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  let user;
  try {
    user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const message = `Click the link to reset your password: ${resetUrl}`;

    console.log("RESET URL:", resetUrl);
    console.log("Reset email will be sent to:", user.email);

    if (!user.password || user.provider !== "local") {
      return res.status(400).json({
        message:
          "This account was created using Google or Facebook. Please use that method to sign in.",
      });
    }

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: message,
    });

    res.status(200).json({ message: "Reset link sent to email" });
  } catch (error) {
    if (user) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
    }
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  console.log("🔐 Raw token from URL:", token);
  console.log("🔒 Hashed token for DB lookup:", tokenHash);

  const user = await User.findOne({
    passwordResetToken: tokenHash,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Token is invalid or expired" });
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password has been reset" });
};

const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logged out successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  googleSignUpController,
  refreshTokenHandler,
  googleAuthController,
  facebookAuthController,
  facebookSignUpController,
  forgotPassword,
  resetPassword,
  logoutUser,
};
