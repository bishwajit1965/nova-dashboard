import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiService } from "../api/apiService";
import toast from "react-hot-toast";

export const useApiMutation = ({ method, path, key, onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      const resolvedPath = typeof path === "function" ? path(data) : path;
      if (method === "remove") {
        return apiService.remove(resolvedPath, data.id);
      }
      const payload = data.data || data.body || data; //Always use payload correctly

      return apiService[method](resolvedPath, payload);
    },
    onSuccess: (data, variables, context) => {
      let label =
        {
          create: "Created",
          update: "Updated",
          remove: "Deleted",
        }[method] || "completed";
      toast.success(`Permission ${label} is successful!`);
      queryClient.invalidateQueries(key);
      onSuccess?.(data, variables, context);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong.");
      onError?.(error);
    },
  });
};
