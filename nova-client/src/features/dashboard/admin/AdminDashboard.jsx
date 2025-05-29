import { Activity, Users } from "lucide-react";

import ActivityChart from "../components/widgets/ActivityChart";
import Notifications from "../components/widgets/Notifications";
import RevenueCard from "../components/widgets/RevenueCard";
import RevenueChart from "../components/widgets/RevenueChart";
import StatsCard from "../components/widgets/StatsCard";
import UserRolesPieChart from "../components/widgets/UserRolesPieChart";
import { useAuth } from "../../../hooks/useAuth";

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  console.log("USER DATA", user);
  return (
    <div className="p- space-y-6">
      <h1 className="text-2xl font-bold">Welcome Admin</h1>
      {/* Stat Cards Row begins */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatsCard title="Total Users" value="1,024" icon={Users} />
          <StatsCard title="Active Sessions" value="312" icon={Activity} />
          <RevenueCard
            title="Monthly Revenue"
            amount="$8,420"
            percentage={12.3}
          />
          <RevenueCard
            title="Conversion Rate"
            amount="3.4%"
            percentage={-1.2}
            positive={false}
          />
        </div>
      </div>
      {/* Stat Cards Row ends */}

      {/* Charts and Notifications begins */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RevenueChart />
        <UserRolesPieChart />
        <Notifications />
      </div>
      <ActivityChart />
      <Notifications />

      {/* Charts and Notifications ends */}
      <p>User data: {user?.email ? user.email : "N/A"}</p>
      <p>User role: {user?.roles ? user.roles : "N/A"}</p>
      <p>Authenticated: {isAuthenticated.toString()}</p>
    </div>
  );
};

export default AdminDashboard;
