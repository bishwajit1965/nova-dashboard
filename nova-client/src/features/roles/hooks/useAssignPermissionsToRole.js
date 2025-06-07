import API_PATHS from "../../../services/apiPaths";
import useApiMutation from "../../../hooks/useApiMutation";

const useAssignPermissions = (roleId, onSuccess) =>
  useApiMutation({
    url: API_PATHS.ROLE_PERMISSIONS(roleId),
    method: "patch",
    onSuccess,
  });

export default useAssignPermissions;
