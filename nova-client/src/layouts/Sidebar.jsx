import {
  BadgeHelp,
  CircleGauge,
  ListCheck,
  Settings,
  ShieldCheckIcon,
  SquareChartGantt,
  UserPen,
  UsersIcon,
  X,
} from "lucide-react";

import PluginLink from "../components/ui/PluginLink";

const navItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: CircleGauge,
    end: true,
  },
  {
    to: "/dashboard/users",
    label: "Manage Users",
    icon: UsersIcon,
  },
  {
    to: "/dashboard/settings",
    label: "Manage Settings",
    icon: Settings,
  },
  {
    to: "/dashboard/profile",
    label: "Manage Profile",
    icon: UserPen,
  },
  {
    to: "/dashboard/help",
    label: "Seek Help",
    icon: BadgeHelp,
  },
  {
    to: "/my-buttons",
    label: "Button Demo",
    icon: SquareChartGantt,
  },
  {
    to: "admin/role",
    label: "Manage Roles",
    icon: SquareChartGantt,
  },
  {
    to: "admin/users/management",
    label: "Manage Users Profile",
    icon: SquareChartGantt,
  },
  {
    to: "admin/permissions",
    label: "Manage Permissions",
    icon: ShieldCheckIcon,
  },
  {
    to: "admin/users-roles-permissions",
    label: "Manage Roles & Perm",
    icon: ShieldCheckIcon,
  },
  {
    to: "admin/audit-log",
    label: "Manage Audit Log",
    icon: ListCheck,
  },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-800 text-base-content transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0 " : "-translate-x-full"}
      lg:translate-x-0 lg:static lg:block overflow-y-auto shadow-inner`}
    >
      {/* Close button for mobile only */}
      <div className="lg:hidden flex justify-end p-4">
        <button onClick={toggleSidebar} aria-label="Close Sidebar mr-4">
          <X size={28} />
        </button>
      </div>

      {/* Navigation Content */}
      <nav className="space-y-2">
        <div className="flex items-center space-x-2 bg-gray-900 p-2 mb-4 border-b border-gray-800">
          <div className="h-12 w-12 rounded-full bg-gray-400">
            <img
              src="https://i.ibb.co.com/MgsDqCZ/FB-IMG-1678691214526.jpg"
              alt=""
              className="h-12 w-12 rounded-full"
            />
          </div>
          <h2 className="text-lg font-bold text-base-300">Nova Dashboard</h2>
        </div>
        <div className="p-2 space-y-3">
          {navItems.map(({ to, label, icon, end }) => (
            <PluginLink
              key={to}
              to={to}
              label={label}
              icon={icon}
              end={end}
              variant="gray"
              className="bg-slate-700 hover:bg-slate-600 w-full shadow hover:shadow-inner active:shadow-inner inverted-colors:"
            />
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
