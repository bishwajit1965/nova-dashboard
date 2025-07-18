const Invite = require("../models/Invite");
const User = require("../models/User");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const sendTeamInvite = async (req, res) => {
  const { email, teamId } = req.body;
  try {
    const invite = new Invite({ email, team: teamId });
    const rawToken = invite.generateToken(); // ✅ fixed instance call
    await invite.save();

    const inviteLink = `${process.env.CLIENT_URL}/accept-invite/${rawToken}`;
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
    const hashedToken = crypto
      .createHash("sha256")
      .update(token) // ✅ use variable
      .digest("hex");

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
      });
    } else {
      user.team = invite.team;
    }

    await user.save();

    invite.accepted = true;
    await invite.save();

    res
      .status(200)
      .json({ success: true, message: "Invitation accepted successfully." });
  } catch (error) {
    console.error("Accept Invite Error:", error);
    res.status(500).json({ message: "Failed to accept invitation" });
  }
};

module.exports = { sendTeamInvite, acceptInvite };
