const Team = require("../models/Team");
const User = require("../models/User");
const Role = require("../models/Role");
const Invite = require("../models/Invite");
const sendInviteEmail = require("../utils/sendInviteEmail");

const createTeam = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, metadata } = req.body;

    // Prevent user owning multiple teams
    const existingTeam = await Team.findOne({ owner: userId });
    if (existingTeam) {
      return res.status(400).json({ message: "You already own a team." });
    }

    // Create team
    const team = await Team.create({ name, owner: userId, metadata });

    // Find global admin role
    const adminRole = await Role.findOne({ name: "admin" });
    if (!adminRole) {
      return res
        .status(500)
        .json({ message: "Admin role not found. Please set up roles first." });
    }

    // Attach team and admin role to user (team owner)
    await User.findByIdAndUpdate(userId, {
      team: team._id,
      $addToSet: { roles: adminRole._id },
    });

    res
      .status(201)
      .json({ message: "Team created and admin role assigned", team });
  } catch (error) {
    console.error("Create Team Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getRolesForTeam = async (req, res) => {
  const { teamId } = req.params;

  try {
    const roles = await Role.find({
      $or: [
        { team: teamId },
        { team: { $exists: false } }, // include global roles
        { team: null },
      ],
    }).select("_id name description");

    res.status(200).json({ roles });
  } catch (err) {
    console.error("Failed to fetch roles", err);
    res.status(500).json({ message: "Error fetching roles" });
  }
};

const inviteUserToTeam = async (req, res) => {
  const { email, role, teamId } = req.body;
  const inviterId = req.user._id;

  try {
    // 1. Verify team exists
    const team = await Team.findById(teamId);
    console.log("TEAM+>", team);
    if (!team) return res.status(404).json({ message: "Team not found." });

    // 2. Ensure the inviter is the team owner
    if (team.owner.toString() !== inviterId.toString()) {
      return res.status(403).json({ message: "Not authorized to invite." });
    }

    // 3. Get role document
    // const roleDoc = await Role.findOne( { _id: role, team: teamId } ); // Scoped to team
    const roleDoc = await Role.findOne({
      _id: role,
      $or: [{ team: teamId }, { team: { $exists: false } }],
    });

    if (!roleDoc) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    // 4. Check if user already exists
    let user = await User.findOne({ email });
    console.log("USER FOUND", user);

    if (user) {
      // Already in another team?
      if (user.team && user.team.toString() !== teamId) {
        return res
          .status(400)
          .json({ message: "User is already in another team" });
      }

      // Assign team and role
      user.team = teamId;
      if (!user.roles.includes(roleDoc._id)) {
        user.roles.push(roleDoc._id);
      }

      await user.save();
      return res.status(200).json({ message: "User added to team" });
    }

    // 5. Create invite for new user
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

    const invite = new Invite({ email, team: teamId, role: roleDoc._id });
    const token = invite.generateToken();
    await invite.save();

    const inviteUrl = `https://yourfrontend.com/accept-invite/${token}`;
    await sendInviteEmail(email, inviteUrl);

    res.status(200).json({ message: "Invitation sent to new user" });
  } catch (error) {
    console.error("Invite Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createTeam,
  getRolesForTeam,
  inviteUserToTeam,
};
