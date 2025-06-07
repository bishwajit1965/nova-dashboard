import { LucideIcon } from "../../../../lib/LucideIcons";
import StatsCard from "./StatsCard";
import api from "../../../../lib/api";
import useApiQuery from "../../../../hooks/useApiQuery";

const TotalUsersCard = () => {
  const { data, isLoading } = useApiQuery({
    key: "totalUsers",
    url: "/users",
    select: (data) => data.users,
    fetcher: (url) =>
      api.get(url, { withCredentials: true }).then((res) => res.data),
  });

  const count = data?.length ?? 0;

  return (
    <StatsCard
      title="Total Users"
      value={isLoading ? "..." : count}
      icon={LucideIcon.Users}
    />
  );
};

export default TotalUsersCard;
