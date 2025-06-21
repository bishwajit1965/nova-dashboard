const API_PATHS = {
  AUDIT_LOGS: {
    ENDPOINT: "audit-logs",
    KEY: "auditLogs",
  },
  CONTACT_MESSAGES: {
    ENDPOINT: "contacts",
    KEY: "contactMessages",
  },
  USERS: {
    ENDPOINT: "users",
    KEY: ["users"],
  },
  ROLES: {
    ENDPOINT: "roles",
    KEY: ["roles"],
  },
  PERMISSIONS: {
    ENDPOINT: "permissions",
    KEY: ["permissions"],
  },
  // Extend this for other features.....
};
export default API_PATHS;
