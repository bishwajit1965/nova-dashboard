// navConfig.js  (keep this separate for cleanliness)

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

export const NAV_ITEMS = [
  // ------------- Everyone -------------
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: CircleGauge,
    roles: ["user", "editor", "admin"],
    end: true,
  },
  {
    to: "/dashboard/settings",
    label: "Manage Settings",
    icon: Settings,
    roles: ["user", "editor", "admin"],
  },
  {
    to: "/dashboard/profile",
    label: "Manage Profile",
    icon: UserPen,
    roles: ["user", "editor", "admin"],
  },
  {
    to: "/dashboard/help",
    label: "Seek Help",
    icon: BadgeHelp,
    roles: ["user", "editor", "admin"],
  },
  {
    to: "/my-buttons",
    label: "Button Demo",
    icon: SquareChartGantt,
    roles: ["user", "editor", "admin"],
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
    roles: ["admin", "editor", "user"],
    permissions: ["audit_log"], // authority gate
    feature: "audit-logs",
  },
  {
    to: "/dashboard/admin/contact-messages",
    label: "Manage Contacts",
    icon: ListCheck,
    roles: ["admin", "editor", "user"],
    permissions: ["audit_log"],
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
    to: "/dashboard/admin/news-letter",
    label: "Manage Newsletters",
    icon: Settings,
    roles: ["admin"],
  },
];
