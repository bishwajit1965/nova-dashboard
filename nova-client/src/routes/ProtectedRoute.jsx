import { Navigate, useLocation } from "react-router-dom";

import Loader from "../components/ui/Loader";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({
  children,
  allowedRoles = [],
  requiredPermissions = [],
  requiredFeatures = [], // 🆕 Feature-based access
  superAdminOnly = false, // ✅ NEW: restrict route to super admins
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // ✅ Super admin override
  if (superAdminOnly && !user.isSuperAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  const userRoles =
    user.roles?.map((r) => (typeof r === "string" ? r : r.name)) || [];
  const userPermissions = user.permissions || [];
  const isAdmin = userRoles.includes("admin");

  // ✅ Plan features: array of objects with { key, title }
  const userFeatures = user.plan?.features?.map((f) => f.key) || [];

  const hasRoleAccess =
    isAdmin ||
    allowedRoles.length === 0 ||
    allowedRoles.some((role) => userRoles.includes(role));

  const hasPermissionAccess =
    isAdmin ||
    requiredPermissions.length === 0 ||
    requiredPermissions.every((perm) => userPermissions.includes(perm));

  const hasFeatureAccess =
    isAdmin ||
    requiredFeatures.length === 0 ||
    requiredFeatures.every((f) => userFeatures.includes(f));
  if (!hasRoleAccess || !hasPermissionAccess || !hasFeatureAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
