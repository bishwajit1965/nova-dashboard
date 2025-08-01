const Invite = require("../models/Invite");
const User = require("../models/User");
const Team = require("../models/Team");
const Role = require("../models/Role");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const sendTeamInvite = async (req, res) => {
  const { email, teamId } = req.body;
  try {
    const invite = new Invite({ email, team: teamId });
    const rawToken = invite.generateToken();

    await invite.save();
    const baseURL = process.env.CLIENT_URL || "http://localhost:5173";

    const inviteLink = `${baseURL}/accept-invite/${rawToken}`;
    const message = `You have been invited to join a team. Click to accept: ${inviteLink}`;

    await sendEmail({
      to: email,
      subject: "Team Invitation", // ✅ lowercase 'subject'
      text: message,
    });

    res.status(200).json({ success: true, message: "Invitation is sent." });
  } catch (error) {
    console.error("Send Invite Error:", error);
    res.status(500).json({ message: "Failed to send invite" });
  }
};

const acceptInvite = async (req, res) => {
  const { token } = req.params;
  const { name, password } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const invite = await Invite.findOne({
      token: hashedToken,
      expiresAt: { $gt: Date.now() },
      accepted: false,
    });

    if (!invite) {
      return res
        .status(400)
        .json({ message: "Invalid or expired invite token." });
    }

    let user = await User.findOne({ email: invite.email });

    if (!user) {
      user = new User({
        name,
        email: invite.email,
        password,
        team: invite.team,
        roles: invite.role ? [invite.role] : [],
        // roles: [invite.role],
      });
    } else {
      user.team = invite.team;
    }

    await user.save();

    invite.accepted = true;
    await invite.save();

    return res
      .status(200)
      .json({ success: true, message: "Invitation accepted successfully." });
  } catch (error) {
    console.error("Accept Invite Error:", error);
    return res.status(500).json({ message: "Failed to accept invitation" });
  }
};

const getInviteDetails = async (req, res) => {
  const { token } = req.params;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const inviteInfo = await Invite.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
    accepted: false,
  })
    .populate("team", "name")
    .populate("role", "name");

  if (!inviteInfo) {
    return res
      .status(400)
      .json({ message: "This invitation has expired or is no longer valid." });
  }

  return res.status(200).json({
    success: true,
    message: "Invite details fetched successfully.",
    data: inviteInfo,
  });
};

module.exports = { sendTeamInvite, getInviteDetails, acceptInvite };
