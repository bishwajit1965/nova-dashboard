import API_PATHS from "../../common/apiPaths/apiPaths";
import UsersTable from "./components/UserTable";
import { useApiQuery } from "../../common/hooks/useApiQuery";

const UsersPage = () => {
  const { data: users, isLoading } = useApiQuery({
    url: API_PATHS.USERS.ENDPOINT,
    queryKey: API_PATHS.USERS.KEY,
    // select: (res) => res.data, //NOT NEEDED HERE AS HOOK DOES IT
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  const { data: roles } = useApiQuery({
    url: API_PATHS.ROLES.ENDPOINT,
    queryKey: API_PATHS.ROLES.KEY,
    // select: (res) => res.data,//NOT NEEDED HERE AS HOOK DOES IT
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  const { data: permissions } = useApiQuery({
    url: API_PATHS.PERMISSIONS.ENDPOINT,
    queryKey: API_PATHS.PERMISSIONS.KEY,
    // select: (res) => res.data,//NOT NEEDED HERE AS HOOK DOES IT
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <UsersTable
        users={users}
        roles={roles}
        permissions={permissions}
        isLoading={isLoading}
        onSuccess={() => console.log("User updated!")} // or whatever
        onClose={() => console.log("Closed!")} // add this if used
      />
    </div>
  );
};

export default UsersPage;
