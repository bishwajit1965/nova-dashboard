import API_PATHS from "../../../../common/apiPaths/apiPaths";
import { Loader } from "lucide-react";
import { LucideIcon } from "../../../../lib/LucideIcons";
import StatsCard from "./StatsCard";
import { useApiQuery } from "../../../../common/hooks/useApiQuery";

const TotalUsersCard = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useApiQuery({
    url: API_PATHS.USERS.ENDPOINT,
    queryKey: API_PATHS.USERS.KEY,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  const count = users?.length ?? 0;
  if (isError || error)
    return (
      <div className="flex justify-center">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <StatsCard
      title="Total Users"
      value={isLoading ? "..." : count}
      icon={LucideIcon.Users}
    />
  );
};

export default TotalUsersCard;
