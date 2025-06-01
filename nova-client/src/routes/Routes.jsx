import DashboardLayout from "../layouts/DashboardLayout";
import DashboardRouter from "../features/dashboard/DashboardRouter";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import MyButtons from "../stories/sandbox/MyButtons";
import NotFoundPage from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import UserSettings from "../features/account/UserSettings";
import UsersList from "../features/users/UsersList";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true, // 👈 This means "show this when path is exactly '/'"
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute
            allowedRoles={["admin", "editor", "user"]}
            requiredPermissions={[]}
          >
            <DashboardRouter />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/settings",
        element: (
          <ProtectedRoute allowedRoles={["admin", "editor", "user"]}>
            <UserSettings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-buttons",
        element: <MyButtons />,
      },
      {
        path: "/dashboard/users",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <UsersList />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/unauthorized",
        element: <UnauthorizedPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
