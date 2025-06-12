import API_PATHS from "../../common/apiPaths/apiPaths";
import UsersTable from "../../components/users/Userstable";
import { useApiQuery } from "../../common/hooks/useApiQuery";

const AdminUsersManagementPage = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useApiQuery({
    url: API_PATHS.USERS.ENDPOINT,
    queryKey: API_PATHS.USERS.KEY,
    // select: (res) => res.data, //NOT NEEDED HERE AS HOOK DOES IT
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  if (error)
    return (
      <div className="flex justify-center">
        <p>Encountered an error </p>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {isLoading ? (
        <div className="text-center">Loading users...</div>
      ) : (
        <UsersTable users={users} />
      )}
    </div>
  );
};

export default AdminUsersManagementPage;
