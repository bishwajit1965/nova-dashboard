import api from "../lib/api";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const useApiMutation = ({
  url,
  method = "post", // can be "post", "put", "delete", etc.
  onSuccess,
  onError,
  headers,
}) => {
  const mutationFn = async (data) => {
    const res = await api({
      method,
      url,
      data,
      headers,
    });
    return res.data;
  };

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      toast.success("Operation is successful!");
      if (onSuccess) onSuccess(data);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong!");
      if (onError) onError(err);
    },
  });
};

export default useApiMutation;
