import PlanCard from "../../../components/planCard/PlanCard";
import { useAuth } from "../../../hooks/useAuth";

const UserDashboard = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="p-4 space-y-2">
      <div className="flex max-d-md justify-center">
        {user?.plan ? (
          <PlanCard />
        ) : (
          <div className="flex justify-center">
            <p>No plan is available!</p>
          </div>
        )}
      </div>
      <div className="flex mx-auto mt-0 space-x-4">
        <p>User data: {user?.email ? user.email : "N/A"}</p> <span>||</span>
        <p>User refreshTokenHandler: {user?.roles ? user.roles : "N/A"}</p>
        <span>||</span>
        <p>
          User plan tier: {user?.plan?.tier ? user?.plan?.tier : "N/A"}
        </p>{" "}
        <span>||</span>
        <p>Authenticated: {isAuthenticated.toString()}</p>
      </div>
    </div>
  );
};

export default UserDashboard;
