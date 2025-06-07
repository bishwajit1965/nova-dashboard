import UsersTable from "../../components/users/Userstable";
import api from "../../lib/api";
import useApiQuery from "../../hooks/useApiQuery";

const AdminUsersPage = () => {
  const {
    data: users = [],
    isLoading,
    error,
  } = useApiQuery({
    key: "totalUsers",
    url: "/users",
    params: {},
    enabled: true,
    select: (data) => data.users,
    onSuccess: (data) => console.log("Data fetched successfully:", data),
    fetcher: (url, params) =>
      api.get(url, { params, withCredentials: true }).then((res) => res.data),
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

export default AdminUsersPage;
