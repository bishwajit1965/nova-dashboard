import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../lib/api";
import toast from "react-hot-toast";

/**
 * Generic mutation hook for any API entity.
 *
 * @param {Object} options
 * @param {string} options.path - The base path (e.g., "/users", "/posts").
 * @param {string} options.method - HTTP method ("post", "put", "patch", "delete").
 * @param {string} options.successMessage - Message to show on success.
 * @param {string} options.errorMessage - Fallback message for error.
 * @param {string | string[]} [options.invalidate] - Query keys to invalidate on success.
 * @param {Function} [options.onSuccess] - Custom onSuccess callback.
 * @param {Function} [options.onError] - Custom onError callback.
 */
export const useEntityMutation = ({
  path,
  method,
  successMessage,
  errorMessage,
  invalidate,
  onSuccess,
  onError,
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const url = id ? `${path}/${id}` : path;
      const res = await api({ method, url, data });
      return res.data;
    },
    onSuccess: (data) => {
      if (successMessage) toast.success(successMessage);
      if (invalidate) queryClient.invalidateQueries([invalidate].flat());
      if (onSuccess) onSuccess(data);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || errorMessage || "Something went wrong"
      );
      if (onError) onError(err);
    },
  });

  return mutation;
};

// USAGE EXAMPLES
// Update user (PUT)
// const editUser = useEntityMutation({
//     path: "/users",
//     method: "put",
//     successMessage: "User updated",
//     errorMessage: "Update failed",
//     invalidate: "users",
//   });

// Delete user
//   const deleteUser = useEntityMutation({
//     path: "/users",
//     method: "delete",
//     successMessage: "User deleted",
//     invalidate: "users",
//   });
