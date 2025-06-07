import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createRole } from "../api/roleApi";
import toast from "react-hot-toast";

export const useCreateRole = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRole,
    onSuccess: (data) => {
      toast.success("Role created successfully!");
      options.onSuccess?.(data);
      queryClient.invalidateQueries(["roles"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create role.");
      options.onError?.(error);
    },
  });
};
