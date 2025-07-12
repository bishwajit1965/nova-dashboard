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
  NEWS_LETTER: {
    ENDPOINT: "newsletter",
    KEY: ["news-letter"],
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
  TESTIMONIALS: {
    ENDPOINT: "testimonials",
    KEY: ["testimonials"],
  },

  // Extend this for other features.....
};
export default API_PATHS;
