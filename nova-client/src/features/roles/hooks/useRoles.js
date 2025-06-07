import API_PATHS from "../../../services/apiPaths";
import useApiQuery from "../../../hooks/useApiQuery";

const useRoles = () => {
  useApiQuery({
    key: "roles",
    url: API_PATHS.ROLES,
  });
};

export default useRoles;
