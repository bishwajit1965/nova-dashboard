import {
  BadgeHelp,
  CircleGauge,
  ListCheck,
  Settings,
  ShieldCheckIcon,
  SquareChartGantt,
  UserPen,
  UsersIcon,
} from "lucide-react";

const PERMISSIONS = {
  auditLog: ["audit_log"],
  userManagement: ["user_management"],
  // Add more as needed.........
};

const ALL_ROLES = ["admin", "editor", "writer", "user"];

export const NAV_ITEMS = [
  // ------------- Everyone -------------
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: CircleGauge,
    roles: ALL_ROLES,
    end: true,
  },
  {
    to: "/dashboard/settings",
    label: "Manage Settings",
    icon: Settings,
    roles: ALL_ROLES,
  },
  {
    to: "/dashboard/profile",
    label: "Manage Profile",
    icon: UserPen,
    roles: ALL_ROLES,
  },
  {
    to: "/dashboard/help",
    label: "Seek Help",
    icon: BadgeHelp,
    roles: ALL_ROLES,
  },
  {
    to: "/my-buttons",
    label: "Button Demo",
    icon: SquareChartGantt,
    roles: ALL_ROLES,
  },

  // ------------- Admin only -----------
  {
    to: "/dashboard/admin/users",
    label: "Manage Users",
    icon: UsersIcon,
    roles: ["admin"],
  },
  {
    to: "/dashboard/admin/role",
    label: "Manage Roles",
    icon: SquareChartGantt,
    roles: ["admin"],
  },
  {
    to: "/dashboard/admin/permissions",
    label: "Manage Permissions",
    icon: ShieldCheckIcon,
    roles: ["admin"],
  },
  {
    to: "/dashboard/admin/users-roles-permissions",
    label: "Manage Roles & Perm",
    icon: ShieldCheckIcon,
    roles: ["admin"],
  },
  {
    to: "/dashboard/admin/audit-log",
    label: "Manage Audit Log",
    icon: ListCheck,
    roles: ALL_ROLES,
    permissions: PERMISSIONS.auditLog, // authority gate
    feature: "audit-logs",
  },
  {
    to: "/dashboard/admin/contact-messages",
    label: "Manage Contacts",
    icon: ListCheck,
    roles: ALL_ROLES,
    permissions: PERMISSIONS.userManagement,
    feature: "user-management",
  },
  {
    to: "/dashboard/admin/site-settings",
    label: "Site Settings",
    icon: Settings,
    roles: ["admin"],
  },
  {
    to: "/dashboard/admin/plans",
    label: "Manage Plans",
    icon: Settings,
    roles: ["admin"],
  },
  {
    to: "/dashboard/admin/testimonials",
    label: "Manage Testimonials",
    icon: Settings,
    roles: ["admin"],
  },
  {
    to: "/dashboard/admin/create-team",
    label: "Create Team",
    icon: UsersIcon,
    roles: ["admin"],
  },
  {
    to: "/dashboard/admin/invite-users",
    label: "Manage Team",
    icon: UsersIcon,
    roles: ["admin"],
  },
  {
    to: "/dashboard/admin/news-letter",
    label: "Manage Newsletters",
    icon: Settings,
    roles: ["admin"],
  },
];
