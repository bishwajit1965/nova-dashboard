import {
  BadgeHelp,
  CircleGauge,
  Settings,
  SquareChartGantt,
  UserPen,
  UsersIcon,
  X,
} from "lucide-react";

import PluginLink from "../components/ui/PluginLink";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-800 text-base-content transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0 " : "-translate-x-full"}
      lg:translate-x-0 lg:static lg:block overflow-y-auto`}
    >
      {/* Close button for mobile only */}
      <div className="lg:hidden flex justify-end p-4">
        <button onClick={toggleSidebar} aria-label="Close Sidebar mr-4">
          <X size={28} />
        </button>
      </div>

      {/* Navigation Content */}
      <nav className="p- space-y-2">
        <div className="flex items-center space-x-2 bg-gray-700 p-2 mb-4 border-b border-gray-600">
          <div className="h-10 w-10 rounded-full bg-gray-400"></div>
          <h2 className="text-lg font-semibold text-gray-200">
            Nova Dashboard
          </h2>
        </div>
        <div className="p-4 space-y-3">
          <PluginLink
            to="/dashboard"
            label="Dashboard"
            icon={CircleGauge}
            variant="gray"
            end // ✅ ensures it matches only exactly "/dashboard"
            className="bg-slate-600 hover:bg-slate-700 w-full"
          />

          <PluginLink
            to="/dashboard/users"
            label="Manage Users"
            icon={UsersIcon}
            variant="gray"
            className="bg-slate-600 hover:bg-slate-700 w-full"
          />

          <PluginLink
            to="/dashboard/settings"
            label="Manage Settings"
            icon={Settings}
            variant="gray"
            className="bg-slate-600 hover:bg-slate-700 w-full"
          />

          <PluginLink
            to="/dashboard/profile"
            label="Manage Profile"
            icon={UserPen}
            variant="gray"
            className="bg-slate-600 hover:bg-slate-700 w-full"
          />

          <PluginLink
            to="/dashboard/help"
            label="Seek Help"
            icon={BadgeHelp}
            variant="gray"
            className="bg-slate-600 hover:bg-slate-700 w-full"
          />
          <PluginLink
            to="/my-buttons"
            label="Button Demo"
            icon={SquareChartGantt}
            variant="gray"
            className="bg-slate-600 hover:bg-slate-700 w-full"
          />
          <PluginLink
            to="admin/role"
            label="Manage Roles"
            icon={SquareChartGantt}
            variant="gray"
            className="bg-slate-600 hover:bg-slate-700 w-full"
          />
          <PluginLink
            to="admin/users"
            label="Manage Users Profile"
            icon={SquareChartGantt}
            variant="gray"
            className="bg-slate-600 hover:bg-slate-700 w-full"
          />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
