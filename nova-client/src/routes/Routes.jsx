import About from "../pages/About";
import AdminUsersManagementPage from "../features/users/AdminUsersManagementPage";
import AuditLogPage from "../features/auditLog/AuditLogPage";
import Contact from "../pages/Contact";
import ContactMessagesPage from "../pages/admin/ContactMessagesPage";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardRouter from "../features/dashboard/DashboardRouter";
import LandingPage from "../pages/LandingPage";
import Login from "../features/auth/Login";
import MyButtons from "../stories/sandbox/MyButtons";
import NotFoundPage from "../pages/NotFound";
import PermissionManager from "../features/permissions/pages/PermissionManager";
import PlansPage from "../pages/admin/PlansPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicLayout from "../layouts/public/PublicLayout";
import Register from "../features/auth/Register";
import RoleManager from "../features/roles/RolesManager";
import SiteSettingsPage from "../pages/admin/SiteSettingsPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import UserSettings from "../features/account/UserSettings";
import UsersList from "../features/users/UsersList";
import UsersPage from "../features/users/UsersPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  // Public landing layout
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true, // 👈 This means "show this when path is exactly '/'"
        element: <LandingPage />,
      },
      {
        path: "/about",
        element: <About />, // Assuming you have an About component
      },
      {
        path: "/contact",
        element: <Contact />, // Assuming you have a Contact component
      },
      {
        path: "/login",
        element: <Login />,
        handle: { hideLayout: true }, // 👈 flag to hide navbar/footer
      },
      {
        path: "/register",
        element: <Register />,
        handle: { hideLayout: true }, // 👈 flag to hide navbar/footer
      },
      {
        path: "/my-buttons",
        element: <MyButtons />,
      },
      {
        path: "/unauthorized",
        element: <UnauthorizedPage />,
      },
    ],
  },

  //⚡️ Dashboard Layout - all routes under /dashboard share the same layout
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
        path: "admin/site-settings",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <SiteSettingsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/users/management",
        element: <AdminUsersManagementPage />,
      },
      {
        path: "admin/users-roles-permissions",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <UsersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/role",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <RoleManager />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/permissions",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <PermissionManager />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/audit-log",
        element: (
          <ProtectedRoute allowedRoles={["admin", "editor", "user"]}>
            <AuditLogPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/users", // `/dashboard/users`
        element: (
          <ProtectedRoute allowedRoles={["admin", "user"]}>
            <UsersList />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/contact-messages",
        element: (
          <ProtectedRoute allowedRoles={["admin", "editor", "user"]}>
            <ContactMessagesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/plans",
        element: <PlansPage />,
      },
    ],
  },

  // Catch-all fallback
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
