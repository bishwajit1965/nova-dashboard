import AdminDashboard from "./admin/AdminDashboard";
import EditorDashboard from "./editor/EditorDashboard";
import Loader from "../../components/ui/Loader";
import UserDashboard from "./user/UserDashboard";
import { useAuth } from "../../hooks/useAuth";

const DashboardRouter = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) return null;

  const roles = user.roles || [];

  if (roles.includes("admin")) return <AdminDashboard />;
  if (roles.includes("editor")) return <EditorDashboard />;

  return <UserDashboard />;
};

export default DashboardRouter;
