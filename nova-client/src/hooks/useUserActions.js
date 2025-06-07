import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../lib/api";
import toast from "react-hot-toast";

export const useUserActions = () => {
  const queryClient = useQueryClient();

  const editUser = useMutation({
    mutationFn: ({ id, data }) => api.put(`/users/${id}`, data),
    onSuccess: () => {
      toast.success("User updated");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Update failed");
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id) => api.delete(`/users/${id}`),
    onSuccess: () => {
      toast.success("User deleted");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Delete failed");
    },
  });

  const viewUser = useMutation({
    mutationFn: (id) => api.get(`/users/${id}`),
    onSuccess: (data) => {
      toast.success("User data fetched");
      // Use data however you want, e.g. set in state
      console.log("👁️ User info →", data);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "View failed");
    },
  });

  return {
    editUser,
    deleteUser,
    viewUser,
  };
};
