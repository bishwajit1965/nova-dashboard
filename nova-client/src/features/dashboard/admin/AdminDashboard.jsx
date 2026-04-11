import ActivityChart from "../components/widgets/ActivityChart";
import BillingSummaryCard from "../components/widgets/BillingSummaryCard";
import FeatureStatsCard from "../components/widgets/FeatureStatsCard";
import Notifications from "../components/widgets/Notifications";
import PlanAndSummaryCard from "../components/widgets/PlanAndSummaryCard";
import PlanSignUpsOverviewCard from "../components/widgets/PlanSignupsOverviewCard";
import RecentPlanChangesCard from "../components/widgets/RecentPlanChangesCard";
import RevenueChart from "../components/widgets/RevenueChart";
import UserRolesDistributionCard from "../components/widgets/UserRolesDistributionCard";
import { useAuth } from "../../../hooks/useAuth";
import { useDocumentHead } from "../../../hooks/useDocumentHead";

const AdminDashboard = () => {
  useDocumentHead("Admin Dashboard • Nova Dashboard", [
    { name: "description", content: "Admin dashboard" },
  ]);

  const { user, isAuthenticated } = useAuth();

  return (
    <div className="space-y-8 bg-base-100 min-h-[calc(100vh-4rem)]">
      {/* Welcome Message */}
      <h1 className="text-3xl font-extrabold text-base-content">
        Welcome, <span className="text-primary">{user?.name || "Admin"}</span>
      </h1>

      {/* === Plans & Billing Summary === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-content">
          Plans & Billing
        </h2>

        {/* First row: Plan summary, Features Stats, Plan Signups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <PlanAndSummaryCard />
          <FeatureStatsCard />
          <PlanSignUpsOverviewCard />
        </div>

        {/* Second row: Recent Plan Changes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pt-4">
          <RecentPlanChangesCard />
        </div>
      </section>

      {/* === Billing: Billing summary section === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-content">Billing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <BillingSummaryCard />
        </div>
      </section>

      {/* === Insights: Charts and Notifications === */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-content">Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RevenueChart />

          {/* 3. Role Distribution Card */}
          <UserRolesDistributionCard />
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
