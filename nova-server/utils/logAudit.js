const AuditLog = require("../models/AuditLog");

const logAudit = async ({ userId, action, entityType, entityId, details }) => {
  try {
    await AuditLog.create({
      userId,
      action,
      entityType,
      entityId,
      details,
    });
  } catch (err) {
    console.error("Failed to create audit log:", err);
  }
};
module.exports = logAudit;
