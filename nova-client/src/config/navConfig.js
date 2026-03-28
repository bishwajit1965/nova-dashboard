import {
  BadgeHelp,
  CircleGauge,
  ClipboardList,
  LayoutGrid,
  ListCheck,
  Mail,
  Settings,
  ShieldCheck,
  UserPen,
  UserPlus,
  Users,
} from "lucide-react";

const PERMISSIONS = {
  auditLog: ["audit_log"],
  userManagement: ["user_management"],
};

const ALL_ROLES = ["admin", "editor", "writer", "user"];

export const NAV_ITEMS = [
  // --------- General (All roles) ---------
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: CircleGauge,
    roles: ALL_ROLES,
    end: true,
  },
  {
    to: "/dashboard/profile",
    label: "Manage Profile",
    icon: UserPen,
    roles: ALL_ROLES,
  },
  {
    to: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
    roles: ALL_ROLES,
  },
  {
    to: "/dashboard/help",
    label: "Help & Support",
    icon: BadgeHelp,
    roles: ALL_ROLES,
  },
  {
    to: "/my-buttons",
    label: "Button Demo",
    icon: LayoutGrid,
    roles: ALL_ROLES,
  },

  // --------- Admin Only Route Links ---------
  {
    to: "/dashboard/admin/users",
    label: "Manage Users",
    icon: Users,
    roles: ["admin"],
  },
  {
    to: "/dashboard/admin/create-team",
    label: "Create Team",
    icon: UserPlus,
    roles: ["admin"],
  },
  {
    to: "/dashboard/admin/invite-users",
    label: "Manage Teams-Invites",
    icon: Users,
    roles: ["admin"],
  },
  {
    to: "/dashboard/admin/role",
    label: "Manage Roles",
    icon: ClipboardList,
    roles: ["admin"],
  },
  {
    to: "/dashboard/admin/permissions",
    label: "Manage Permissions",
    icon: ShieldCheck,
    roles: ["admin"],
  },
  {
    to: "/dashboard/admin/users-roles-permissions",
    label: "Users-Roles Overview",
    icon: ShieldCheck,
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
    icon: ClipboardList,
    roles: ["admin"],
  },
  {
    to: "/dashboard/admin/news-letter",
    label: "Manage Newsletters",
    icon: Mail,
    roles: ["admin"],
  },
  {
    to: "/dashboard/admin/site-settings",
    label: "Site Settings",
    icon: Settings,
    roles: ["admin"],
  },

  // --------- Features gated (all roles with permissions) ---------
  {
    to: "/dashboard/admin/audit-log",
    label: "Audit Logs",
    icon: ListCheck,
    roles: ALL_ROLES,
    permissions: PERMISSIONS.auditLog,
    feature: "audit-logs",
  },
  {
    to: "/dashboard/admin/contact-messages",
    label: "Contact Messages",
    icon: ListCheck,
    roles: ALL_ROLES,
    permissions: PERMISSIONS.userManagement,
    feature: "user-management",
  },
];
