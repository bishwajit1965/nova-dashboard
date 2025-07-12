import { Navigate, useLocation } from "react-router-dom";

import Loader from "../components/ui/Loader";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({
  children,
  allowedRoles = [],
  requiredPermissions = [],
  requiredFeatures = [], // 🆕 Feature-based access
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRoles =
    user.roles?.map((r) => (typeof r === "string" ? r : r.name)) || [];
  const userPermissions = user.permissions || [];
  const isAdmin = userRoles.includes("admin");

  // ✅ Plan features: array of objects with { key, title }
  const userFeatures = user.plan?.features?.map((f) => f.key) || [];

  console.log("User features", userFeatures);

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
  console.log("Has feature access", hasFeatureAccess);
  if (!hasRoleAccess || !hasPermissionAccess || !hasFeatureAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;

// import { Navigate, useLocation } from "react-router-dom";

// import Loader from "../components/ui/Loader";
// import { useAuth } from "../hooks/useAuth";

// const ProtectedRoute = ({
//   children,
//   allowedRoles = [],
//   requiredPermissions = [],
// }) => {
//   const { user, isAuthenticated, loading } = useAuth();

//   const location = useLocation();

//   if (loading) return <Loader />;

//   if (!isAuthenticated || !user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // ✅ Normalize role names (handles both populated objects and strings)
//   const userRoles =
//     user.roles?.map((r) => (typeof r === "string" ? r : r.name)) || [];
//   const userPermissions = user.permissions || [];

//   const isAdmin = userRoles.includes("admin");

//   const hasRoleAccess =
//     isAdmin ||
//     allowedRoles.length === 0 ||
//     allowedRoles.some((role) => userRoles.includes(role));

//   const hasPermissionAccess =
//     isAdmin ||
//     requiredPermissions.length === 0 ||
//     requiredPermissions.every((perm) => userPermissions.includes(perm));

//   if (!hasRoleAccess || !hasPermissionAccess) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

// import { Navigate, useLocation } from "react-router-dom";

// import Loader from "../components/ui/Loader";
// import { useAuth } from "../hooks/useAuth";

// const ProtectedRoute = ({
//   children,
//   allowedRoles = [],
//   requiredPermissions = [],
// }) => {
//   const { user, isAuthenticated, loading } = useAuth();
//   const location = useLocation();

//   if (loading) return <Loader />;

//   if (!isAuthenticated || !user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   const hasRoleAccess =
//     user?.roles?.includes("admin") || // ✅ Admin override
//     allowedRoles.some((role) => user.roles?.includes(role));

//   const hasPermissionAccess =
//     user?.roles?.includes("admin") || // ✅ Admin override
//     requiredPermissions.length === 0 ||
//     requiredPermissions.every((permission) =>
//       (user.permissions || []).includes(permission)
//     );

//   if (!hasRoleAccess || !hasPermissionAccess) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// };
// export default ProtectedRoute;
