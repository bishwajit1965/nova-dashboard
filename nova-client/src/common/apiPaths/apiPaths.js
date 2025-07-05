const API_PATHS = {
  AUDIT_LOGS: {
    ENDPOINT: "audit-logs",
    KEY: ["auditLogs"],
  },
  CONTACT_MESSAGES: {
    ENDPOINT: "contacts",
    KEY: ["contactMessages"],
  },
  USERS: {
    ENDPOINT: "users",
    KEY: ["users"],
  },
  // Logged-in user profile
  CURRENT_USER: {
    ENDPOINT: "users/me",
    KEY: ["current-user"],
  },
  // Logged-in user’s plan
  CURRENT_USER_PLAN: {
    ENDPOINT: "users/me/plan",
    KEY: ["current-user-plan"],
  },
  ROLES: {
    ENDPOINT: "roles",
    KEY: ["roles"],
  },
  PERMISSIONS: {
    ENDPOINT: "permissions",
    KEY: ["permissions"],
  },
  PLANS: {
    ENDPOINT: "plans",
    KEY: ["plans"],
  },
  SETTINGS: {
    ENDPOINT: "settings",
    KEY: ["siteSettings"],
  },

  // Extend this for other features.....
};
export default API_PATHS;
