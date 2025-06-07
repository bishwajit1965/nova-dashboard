import { getAllRoles } from "../api/roleApi";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const useFetchRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () =>
      getAllRoles().then((res) => {
        console.log("Hook got response:", res); // For debugging
        return res.data.data; // ✅ Pure roles array
      }),
    // queryFn: getAllRoles,
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to load roles");
    },
  });
};

export default useFetchRoles;
