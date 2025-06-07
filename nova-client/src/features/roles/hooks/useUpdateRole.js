import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateRole } from "../api/roleApi";

export const useUpdateRole = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateRole(id, data),
    onSuccess: (data) => {
      toast.success("Role updated successfully!");
      options.onSuccess?.(data);
      queryClient.invalidateQueries(["roles"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update role.");
      options.onError?.(error);
    },
  });
};
