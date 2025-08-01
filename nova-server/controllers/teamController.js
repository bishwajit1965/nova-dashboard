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

const getTeamMembers = async (req, res) => {
  const { teamId } = req.params;

  try {
    const members = await User.find({ team: teamId }).populate("roles", "name");
    if (!members) {
      return res
        .status(404)
        .json({ message: "No members found for this team" });
    }

    res.status(200).json({ success: true, data: members });
  } catch (error) {
    console.error("Error fetching team members:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const inviteUserToTeam = async (req, res) => {
  const { email, role, teamId } = req.body;
  const inviterId = req.user._id;

  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found." });

    if (team.owner.toString() !== inviterId.toString()) {
      return res.status(403).json({ message: "Not authorized to invite." });
    }

    const roleDoc = await Role.findOne({
      _id: role,
      $or: [{ team: teamId }, { team: { $exists: false } }],
    });

    if (!roleDoc) {
      return res.status(400).json({ message: "Invalid role selected." });
    }

    let user = await User.findOne({ email });
    if (user) {
      if (user.team && user.team.toString() !== teamId) {
        return res
          .status(400)
          .json({ message: "User is already in another team" });
      }

      user.team = teamId;
      if (!user.roles.includes(roleDoc._id)) {
        user.roles.push(roleDoc._id);
      }

      await user.save();
      return res.status(200).json({ message: "User added to team" });
    }

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

    const baseUrl = process.env.CLIENT_URL.replace(/\/$/, "");
    const inviteUrl = `${baseUrl}/accept-invite/${token}`;

    await sendInviteEmail(email, inviteUrl);

    res.status(200).json({ message: "Invitation sent to new user" });
  } catch (error) {
    console.error("Invite Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const removeMemberFromTeam = async (req, res) => {
  console.log("✅ Remove Member from Team Controller Method is hit");
  const id = req.params.id;

  console.log("User ID to remove:", id);

  try {
    const user = await User.findById(id);

    if (!user || !user.team) {
      return res
        .status(404)
        .json({ success: false, message: "User not found or not in a team." });
    }

    user.team = null;
    user.acceptedAt = null; // Optional: reset invite state
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User removed from the team." });
  } catch (error) {
    console.error("Error removing team member:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateTeamMemberRole = async (req, res) => {
  try {
    console.log("REQ.PARAMS:", req.params);
    const id = req.user._id;
    const { role } = req.body;
    if (!role) {
      return res.status(404).json({ message: "Role is required" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Prevent demoting self from admin

    if (user.roles.includes(role) && role === "admin") {
      return res.status(403).json({
        message: "You cannot demote yourself from admin role.",
      });
    }

    user.roles = [role];
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User role updated!", data: user });
  } catch (error) {
    console.error("Error updating team member role:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createTeam,
  getRolesForTeam,
  getTeamMembers,
  inviteUserToTeam,
  updateTeamMemberRole,
  removeMemberFromTeam,
};
