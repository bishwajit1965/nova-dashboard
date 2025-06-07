import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteRole } from "../api/roleApi";
import toast from "react-hot-toast";

export const useDeleteRole = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteRole(id),
    onSuccess: () => {
      toast.success("Role deleted successfully!");
      options.onSuccess?.();
      queryClient.invalidateQueries(["roles"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete role.");
      options.onError?.(error);
    },
  });
};
