import api from "../lib/api";

const apiService = {
  getAll: (path) => api.get(path),
  getById: (path, id) => api.get(`${path}/${id}`),
  create: (path, data) => api.post(path, data),
  update: (path, id, data) => api.patch(`${path}/${id}`, data),
  remove: (path, id) => api.delete(`${path}/${id}`),
};

export default apiService;
