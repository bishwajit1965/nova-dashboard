import { apiService } from "../api/apiService";
import { useQuery } from "@tanstack/react-query";

export const useApiQuery = ({ key, path, enabled = true }) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      if (!path) throw new Error("API path is undefined");
      const res = await apiService.getAll(path);
      if (!res?.data) throw new Error("Permissions not found.");
      return res.data; // This is the array of permissions
    },
    enabled,
  });
};
