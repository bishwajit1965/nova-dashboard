import ActivityChart from "../components/widgets/ActivityChart";
import { AlertTriangle } from "lucide-react";
import Button from "../../../components/ui/Button";
import ErrorBoundary from "../../../components/ui/ErrorBoundary";
import ErrorFallback from "../../../components/ui/ErrorFallback";
import { Link } from "react-router-dom";
import Notifications from "../components/widgets/Notifications";
import PlanCard from "../../../components/planCard/PlanCard";
import { useAuth } from "../../../hooks/useAuth";

const EditorDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  console.log("USER PLAN", user?.plan);
  const plan = user?.plan;
  const isPlanValid = plan && plan._id && plan.tier;

  if (!isPlanValid)
    return (
      <div className="p-6 lg:mt-28 bg-red-50 border border-red-300 rounded-xl text-center shadow-sm max-w-md flex mx-auto">
        <div className="flex flex-col items-center mx-auto space-y-2">
          <AlertTriangle className="text-red-600 w-8 h-8" />
          <h2 className="text-xl font-bold text-red-700">Plan Not Found</h2>
          <p className="text-sm text-red-500">
            Your assigned plan might have been deleted or is unavailable.
          </p>
          <Link to="/">
            <Button variant="default" className="mt-4">
              Choose a New Plan
            </Button>
          </Link>
        </div>
      </div>
    );

  return (
    <div className="p-4 space-y-4">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PlanCard />
      </ErrorBoundary>
      {/* <PlanCard /> */}
      <ActivityChart />
      <Notifications />
      <p>User data: {user?.email ? user.email : "N/A"}</p>
      <p>User refreshTokenHandler: {user?.roles ? user.roles : "N/A"}</p>
      Authenticated: {isAuthenticated.toString()}
    </div>
  );
};

export default EditorDashboard;
