import AdminUsersPage from "../features/users/AdminUsersPage";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardRouter from "../features/dashboard/DashboardRouter";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import MyButtons from "../stories/sandbox/MyButtons";
import NotFoundPage from "../pages/NotFound";
import PermissionManager from "../features/permissions/pages/PermissionManager";
import ProtectedRoute from "./ProtectedRoute";
import RoleManager from "../features/roles/RolesManager";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import UserSettings from "../features/account/UserSettings";
import UsersList from "../features/users/UsersList";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  // Public landing layout
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/my-buttons",
    element: <MyButtons />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },

  // ⚡️ Dashboard Layout - all routes under /dashboard share the same layout
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin", "editor", "user"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true, // `/dashboard`
        element: <DashboardRouter />,
      },
      {
        path: "settings", // `/dashboard/settings`
        element: <UserSettings />,
      },
      {
        path: "admin/users",
        element: <AdminUsersPage />,
      },
      {
        path: "admin/role",
        element: <RoleManager />,
      },
      {
        path: "admin/permissions",
        element: <PermissionManager />,
      },
      {
        path: "users", // `/dashboard/users`
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <UsersList />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // Catch-all fallback
  {
    path: "*",
    element: <NotFoundPage />,
  },
  // {
  //   path: "/",
  //   element: <DashboardLayout />,
  //   children: [
  //     {
  //       index: true, // 👈 This means "show this when path is exactly '/'"
  //       element: <LandingPage />,
  //     },
  //     {
  //       path: "/dashboard",
  //       element: (
  //         <ProtectedRoute
  //           allowedRoles={["admin", "editor", "user"]}
  //           requiredPermissions={[]}
  //         >
  //           <DashboardRouter />
  //         </ProtectedRoute>
  //       ),
  //     },
  //     {
  //       path: "/dashboard/settings",
  //       element: (
  //         <ProtectedRoute allowedRoles={["admin", "editor", "user"]}>
  //           <UserSettings />
  //         </ProtectedRoute>
  //       ),
  //     },
  //     {
  //       path: "/my-buttons",
  //       element: <MyButtons />,
  //     },
  //     {
  //       path: "/dashboard/users",
  //       element: (
  //         <ProtectedRoute allowedRoles={["admin"]}>
  //           <UsersList />,
  //         </ProtectedRoute>
  //       ),
  //     },
  //     {
  //       path: "/unauthorized",
  //       element: <UnauthorizedPage />,
  //     },
  //     {
  //       path: "*",
  //       element: <NotFoundPage />,
  //     },
  //   ],
  // },
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  // },
  // {
  //   path: "*",
  //   element: <NotFoundPage />,
  // },
]);

export default router;
