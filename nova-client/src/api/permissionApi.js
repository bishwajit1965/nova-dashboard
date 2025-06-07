import API_PATHS from "../services/apiPaths";
import api from "../lib/api";
import handleApiCall from "../services/handleApiCall";

const getAllPermissions = () =>
  handleApiCall(() => api.get(API_PATHS.PERMISSIONS));

const getPermissionById = (id) =>
  handleApiCall(() => api.get(API_PATHS.PERMISSION_BY_ID(id)));

const createPermission = (data) =>
  handleApiCall(() => api.post(API_PATHS.PERMISSIONS, data));

const updatePermission = (id, data) =>
  handleApiCall(() => api.patch(API_PATHS.PERMISSION_BY_ID(id), data));

const deletePermission = (id) =>
  handleApiCall(() => api.delete(API_PATHS.PERMISSION_BY_ID(id)));

export {
  getAllPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermission,
};
