import API_PATHS from "../common/apiPaths/apiPaths";
import PlanContext from "../planContext/PlanContext";
import { useApiQuery } from "../common/hooks/useApiQuery";
import { useAuth } from "../hooks/useAuth";

const PlanProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Fetch User with plan
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useApiQuery({
    url: API_PATHS.CURRENT_USER_PLAN.ENDPOINT,
    queryKey: API_PATHS.CURRENT_USER_PLAN.KEY,
    options: {
      enabled: isAuthenticated,
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  // Fetch all plans to display
  const { data: plans } = useApiQuery({
    url: API_PATHS.PLANS.ENDPOINT,
    queryKey: API_PATHS.PLANS.KEY,
    // select: (res) => res.data,//NOT NEEDED HERE AS HOOK DOES IT
    options: {
      enabled: isAuthenticated,
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  const planInfo = {
    user,
    plans,
    isLoading,
    isError,
    error,
  };

  return (
    <PlanContext.Provider value={planInfo}>{children}</PlanContext.Provider>
  );
};

export default PlanProvider;
