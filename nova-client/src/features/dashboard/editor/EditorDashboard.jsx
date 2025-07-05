import ActivityChart from "../components/widgets/ActivityChart";
import Notifications from "../components/widgets/Notifications";
import PlanCard from "../../../components/planCard/PlanCard";
import { useAuth } from "../../../hooks/useAuth";

const EditorDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  console.log("USER PLAN", user?.plan);
  return (
    <div className="p-4 space-y-4">
      {user?.plan ? (
        <PlanCard />
      ) : (
        <div className="flex justify-center">No plan found</div>
      )}
      <ActivityChart />
      <Notifications />
      <p>User data: {user?.email ? user.email : "N/A"}</p>
      <p>User refreshTokenHandler: {user?.roles ? user.roles : "N/A"}</p>
      Authenticated: {isAuthenticated.toString()}
    </div>
  );
};

export default EditorDashboard;
