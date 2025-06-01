import { UserIcon } from "lucide-react";
import api from "../../../../lib/api";
import useApiQuery from "../../../../hooks/useApiQuery";

const TotalUsers = () => {
  const { data, isLoading, error } = useApiQuery({
    key: "totalUsers",
    url: "/users",
    params: {},
    enabled: true,
    select: (data) => data.users,
    onSuccess: (data) => console.log("Data fetched successfully:", data),
    fetcher: (url, params) =>
      api.get(url, { params, withCredentials: true }).then((res) => res.data),
  });

  if (isLoading) {
    return <div className="animate-pulse h-20 bg-gray-200 rounded" />;
  }

  if (error) {
    return (
      <div className="bg-base-50 p-4 rounded-2xl shadow-sm flex items-center gap-4">
        <div className="bg-base-300 shadow p-3 rounded-full">
          <UserIcon className="text-blue-600 w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-base-content">Total Users</p>
          <h3 className="text-2xl font-semibold text-base-content">
            Error fetching data
          </h3>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-base-50 p-4 rounded-2xl shadow-sm flex items-center gap-4">
      <div className="bg-base-300 p-3 rounded-full">
        <UserIcon className="text-blue-600 w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500">Total Users</p>
        <h3 className="text-2xl font-semibold text-base-content">
          {data.length > 0 ? data.length : 0}
        </h3>
      </div>
    </div>
  );
};

export default TotalUsers;
