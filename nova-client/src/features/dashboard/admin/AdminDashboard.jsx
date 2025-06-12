import { Activity } from "lucide-react";
import ActivityChart from "../components/widgets/ActivityChart";
import LiveUsersCard from "../components/widgets/LiveUsersCard";
import NewSignUpsCard from "../components/widgets/NewSignupsCard";
import Notifications from "../components/widgets/Notifications";
import RevenueCard from "../components/widgets/RevenueCard";
import RevenueChart from "../components/widgets/RevenueChart";
import StatsCard from "../components/widgets/StatsCard";
import TotalUsersCard from "../components/widgets/TotalUsersCard";
import UserRolesPieChart from "../components/widgets/UserRolesPieChart";
import { useAuth } from "../../../hooks/useAuth";

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="p-6 space-y-8 bg-base-100 min-h-[calc(100vh-4rem)]">
      {" "}
      {/* Added base background and better spacing */}
      {/* Welcome Message */}
      <h1 className="text-3xl font-extrabold text-base-content">
        Welcome, <span className="text-primary">{user?.name || "Admin"}</span>
      </h1>
      {/* === Overview Stat Cards === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-content">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <TotalUsersCard />
          <LiveUsersCard count={27} />
          <NewSignUpsCard count={8} />
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
      </section>
      {/* === Insights: Charts and Notifications === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-content">Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RevenueChart />
          <UserRolesPieChart />
          <Notifications />
        </div>
      </section>
      {/* === Activity Logs === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-content">Activity</h2>
        <ActivityChart />
      </section>
      {/* === Debug/Test Info === */}
      <section className="text-sm text-neutral-content space-y-1">
        <p>
          <span className="font-semibold">User Email:</span>{" "}
          {user?.email || "N/A"}
        </p>
        <p>
          <span className="font-semibold">User Role:</span>{" "}
          {user?.roles?.join(", ") || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Authenticated:</span>{" "}
          {isAuthenticated.toString()}
        </p>
      </section>
    </div>
  );
};

export default AdminDashboard;

// import { Activity } from "lucide-react";
// import ActivityChart from "../components/widgets/ActivityChart";
// import LiveUsersCard from "../components/widgets/LiveUsersCard";
// import NewSignUpsCard from "../components/widgets/NewSignupsCard";
// import Notifications from "../components/widgets/Notifications";
// import RevenueCard from "../components/widgets/RevenueCard";
// import RevenueChart from "../components/widgets/RevenueChart";
// import StatsCard from "../components/widgets/StatsCard";
// import TotalUsersCard from "../components/widgets/TotalUsersCard";
// import UserRolesPieChart from "../components/widgets/UserRolesPieChart";
// import { useAuth } from "../../../hooks/useAuth";

// const AdminDashboard = () => {
//   const { user, isAuthenticated } = useAuth();

//   return (
//     <div>
//       <div className="p-4 space-y-6">
//         <h1 className="text-2xl font-bold text-base-content">Welcome, Admin</h1>

//         {/* === Overview Stat Cards === */}
//         <section className="space-y-2">
//           <h2 className="text-lg font-semibold text-neutral-content">
//             Overview
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//             <TotalUsersCard />
//             <LiveUsersCard count={27} />
//             <NewSignUpsCard count={8} />
//             <StatsCard title="Active Sessions" value="312" icon={Activity} />
//             <RevenueCard
//               title="Monthly Revenue"
//               amount="$8,420"
//               percentage={12.3}
//             />
//             <RevenueCard
//               title="Conversion Rate"
//               amount="3.4%"
//               percentage={-1.2}
//               positive={false}
//             />
//           </div>
//         </section>

//         {/* === Insights: Charts and Notifications === */}
//         <section className="space-y-2">
//           <h2 className="text-lg font-semibold text-neutral-content">
//             Insights
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <RevenueChart />
//             <UserRolesPieChart />
//             <Notifications />
//           </div>
//         </section>

//         {/* === Activity Logs === */}
//         <section className="space-y-2">
//           <h2 className="text-lg font-semibold text-neutral-content">
//             Activity
//           </h2>
//           <ActivityChart />
//         </section>

//         {/* === Debug/Test Info === */}
//         <section className="text-sm text-neutral-content">
//           <p>User Email: {user?.email || "N/A"}</p>
//           <p>User Role: {user?.roles || "N/A"}</p>
//           <p>Authenticated: {isAuthenticated.toString()}</p>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
