import AdminDashboard from "./admin/AdminDashboard";
import Loader from "../../components/ui/Loader";
import UnifiedRolesDashboard from "./unifiedRolesDashboard/UnifiedRolesDashboard";
import { useAuth } from "../../hooks/useAuth";

const DashboardRouter = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) return null;

  const roles = user.roles || [];
  const roleNames = roles.map((r) => (typeof r === "string" ? r : r.name));

  return roleNames.includes("admin") ? (
    <AdminDashboard />
  ) : (
    <UnifiedRolesDashboard />
  );
};

export default DashboardRouter;
