const API_PATHS = {
  ROLES: "/roles",
  ROLE_BY_ID: (id) => `/roles/${id}`,
  ROLE_PERMISSIONS: (id) => `/roles/${id}/permissions`,

  PERMISSIONS: "/permissions",
  PERMISSION_BY_ID: (id) => `/permissions/${id}`,

  USERS: "/admin/users",
  // other paths...
};

export default API_PATHS;
