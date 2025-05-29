import ActivityChart from "../components/widgets/ActivityChart";
import Notifications from "../components/widgets/Notifications";
import { useAuth } from "../../../hooks/useAuth";

const EditorDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Editor Dashboard</h2>
      <ActivityChart />
      <Notifications />
      <p>User data: {user?.email ? user.email : "N/A"}</p>
      <p>User refreshTokenHandler: {user?.roles ? user.roles : "N/A"}</p>
      Authenticated: {isAuthenticated.toString()}
    </div>
  );
};

export default EditorDashboard;
