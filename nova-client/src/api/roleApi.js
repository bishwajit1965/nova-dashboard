import API_PATHS from "../services/apiPaths";
import api from "../lib/api";
import handleApiCall from "../services/handleApiCall";

const getAllRoles = () => handleApiCall(() => api.get(API_PATHS.ROLES));

const getRoleById = (id) =>
  handleApiCall(() => api.get(API_PATHS.ROLE_BY_ID(id)));

const createRole = (data) =>
  handleApiCall(() => api.post(API_PATHS.ROLES, data));

const updateRole = (id, data) =>
  handleApiCall(() => api.patch(API_PATHS.ROLE_BY_ID(id), data));

const deleteRole = (id) =>
  handleApiCall(() => api.delete(API_PATHS.ROLE_BY_ID(id)));

const assignPermissionsToRole = (roleId, permissions) =>
  handleApiCall(() =>
    api.patch(API_PATHS.ROLE_PERMISSIONS(roleId), { permissions })
  );

export {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  assignPermissionsToRole,
};
