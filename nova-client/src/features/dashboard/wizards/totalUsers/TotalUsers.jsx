import { Loader, UsersRoundIcon } from "lucide-react";

import API_PATHS from "../../../../common/apiPaths/apiPaths";
import { useApiQuery } from "../../../../common/hooks/useApiQuery";

const TotalUsers = () => {
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

  if (isLoading)
    return <Loader className="animate-spin w-6 h-6 text-blue-600" />;

  if (isError) return <Loader className="animate-spin w-6 h-6 text-red-600" />;

  if (error) {
    return (
      <div className="bg-base-50 p-4 rounded-2xl shadow-sm flex items-center gap-4">
        <div className="bg-base-300 shadow p-3 rounded-full">
          <UsersRoundIcon className="text-blue-600 w-6 h-6" />
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
        <UsersRoundIcon className="text-blue-600 w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500">Total Users</p>
        <h3 className="text-2xl font-semibold text-base-content">
          {users?.length ? users?.length : "0"}
        </h3>
      </div>
    </div>
  );
};

export default TotalUsers;
