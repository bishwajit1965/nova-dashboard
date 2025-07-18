const Team = require("../models/Team");
const User = require("../models/User");
const Role = require("../models/Role");
const Invite = require("../models/Invite");
const sendInviteEmail = require("../utils/sendInviteEmail");

const createTeam = async (req, res) => {
  const { name, metadata } = req.body;

  try {
    const userId = req.user._id;

    // Optional: prevent multiple teams per user
    const existingTeam = await Team.findOne({ owner: userId });
    if (existingTeam) {
      return res.status(400).json({ message: "You already own a team." });
    }

    const team = await Team.create({
      name,
      owner: userId,
      metadata,
    });

    // Attach team to user
    await User.findByIdAndUpdate(userId, { team: team._id });

    res.status(201).json({ message: "Team created successfully", team });
  } catch (error) {
    console.error("Create Team Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const inviteUserToTeam = async (req, res) => {
  console.log("☘️ Invite user to team controller is hit");
  const { email, role, teamId } = req.body;
  console.log("Email", email);
  console.log("Role", role);
  console.log("Team Id", teamId);

  try {
    const team = await Team.findById(teamId);
    console.log("Team data", team);
    if (!team) return res.status(404).json({ message: "Team not found." });

    // Make sure the requestor is the owner
    if (team.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to invite users to this team.",
      });
    }

    let user = await User.findOne({ email });
    console.log("USER FOUND", user);

    // ✅ CASE 1: User already exists
    if (user) {
      if (user.team && user.team.toString() !== teamId) {
        return res
          .status(400)
          .json({ message: "User already belongs to a different team." });
      }

      user.team = teamId;

      const roleDoc = await Role.findOne({ name: role });
      if (roleDoc && !user.roles.includes(roleDoc._id)) {
        user.roles.push(roleDoc._id);
      }

      await user.save();
      return res
        .status(200)
        .json({ message: "Existing user added to the team." });
    }

    // ✅ CASE 2: User doesn't exist — generate invite
    const existingInvite = await Invite.findOne({
      email,
      team: teamId,
      accepted: false,
    });

    if (existingInvite) {
      return res.status(400).json({
        message: "User has already been invited and not yet accepted.",
      });
    }

    const invite = new Invite({ email, team: teamId });
    const rawToken = invite.generateToken();
    await invite.save();

    const inviteLink = `https://yourfrontend.com/accept-invite/${rawToken}`;
    await sendInviteEmail(email, inviteLink);

    res.status(200).json({ message: "Invitation email sent to new user." });
  } catch (error) {
    console.error("Invite Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createTeam,
  inviteUserToTeam,
};
