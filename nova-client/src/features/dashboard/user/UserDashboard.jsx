import { useAuth } from "../../../hooks/useAuth";

const UserDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Welcome to your dashboard</h2>
      <p className="mt-2">You can view your activities and stats here.</p>
      <p>User data: {user?.email ? user.email : "N/A"}</p>
      <p>User role: {user?.roles ? user.roles : "N/A"}</p>
      Authenticated: {isAuthenticated.toString()}
    </div>
  );
};

export default UserDashboard;
