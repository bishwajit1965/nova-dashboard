const User = require("../models/User.js");
const Role = require("../models/Role.js");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const qs = require("querystring"); // built-in Node.js module
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
    if (!userRole) {
      return res.status(500).json({ message: "Default role 'user' not found" });
    }
    const user = await User.create({
      name,
      email,
      password,
      roles: [userRole._id],
      permissions: [],
    });

    user = await User.findById(user._id)
      .populate("roles")
      .populate("permissions")
      .populate("plan", "_id name price tier features");

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
  const { id_token } = req.body;
  console.log("👉 Received id_token:", id_token);

  if (!id_token || !id_token.startsWith("eyJ")) {
    return res.status(400).json({
      message: "Invalid or missing Google ID token",
    });
  }
  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, sub: googleId } = payload;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email not found in Google token." });
    }

    // 🔍 Check if user exists
    let user = await User.findOne({ email });
    console.log("USER FOUND:", user);

    const userRole = await Role.findOne({ name: "user" });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        provider: "google",
        permissions: [],
        roles: [userRole._id], // default role
        password: null,
      });
    }

    // ✅ Generate access and refresh tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user._id);
    console.log("Access token", accessToken);

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
      message: "Google sign up is successful",
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        roles: user.roles.map((role) => role.name),
        permissions: user.permissions.map((perm) => perm.name),
        plan: {
          tier: user.plan?.tier ?? "free",
          features: user.plan?.features ?? [],
        },
      },
    });
  } catch (error) {
    console.error("❌ Google Auth Error:", error);
    return res.status(401).json({ message: "Google sign up failed." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select("+password")
      .populate("roles")
      .populate("permissions")
      .populate("plan", "_id name price tier features");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

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
      .populate("plan", "_id name price tier features");

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
    let user = await User.findOne({ email })
      .populate("roles")
      .populate("permissions");

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
        plan: {
          tier: user.plan?.tier ?? "free",
          features: user.plan?.features ?? [],
        },
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

  try {
    const fbRes = await axios.get(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`
    );

    const { email, name, id, picture } = fbRes.data;

    let user = await findOrCreateUser({ email, name, providerId: id });

    const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token: jwtToken, user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Facebook authentication failed" });
  }
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
  logoutUser,
};
