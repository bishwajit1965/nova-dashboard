import API_PATHS from "../../../services/apiPaths";
import api from "../../../lib/api";

export const getAllRoles = () => api.get(API_PATHS.ROLES);
export const getRoleById = (id) => api.get(API_PATHS.ROLE_BY_ID(id));
export const createRole = (data) => api.post(API_PATHS.ROLES, data);
export const updateRole = (id, data) =>
  api.patch(API_PATHS.ROLE_BY_ID(id), data);
export const deleteRole = (id) => api.delete(API_PATHS.ROLE_BY_ID(id));
export const assignPermissionsToRole = (roleId, permissions) =>
  api.patch(API_PATHS.ROLE_PERMISSIONS(roleId), { permissions });
