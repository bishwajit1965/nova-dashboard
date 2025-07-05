import { NAV_ITEMS } from "../config/navConfig";
import PluginLink from "../components/ui/PluginLink";
import { X } from "lucide-react";
import { useNavAccess } from "../hooks/useNavAccess";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const canShow = useNavAccess();

  /* ---------- filter menu ---------- */
  const menu = NAV_ITEMS.filter(canShow);

  return (
    <aside
      className={`fixed top-0 left-0 z-50 w-64 h-screen bg-gray-800 text-base-content
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:block overflow-y-auto shadow-inner`}
    >
      {/* mobile close */}
      <div className="lg:hidden flex justify-end p-4">
        <button onClick={toggleSidebar} aria-label="Close Sidebar">
          <X size={28} />
        </button>
      </div>

      {/* brand */}
      <div className="flex items-center space-x-2 bg-gray-900 p-4 mb-4 border-b border-gray-800">
        <img
          src="https://i.ibb.co.com/MgsDqCZ/FB-IMG-1678691214526.jpg"
          alt="logo"
          className="h-12 w-12 rounded-full"
        />
        <h2 className="text-lg font-bold text-base-300">Nova&nbsp;Dashboard</h2>
      </div>

      {/* links */}
      <nav className="p-2 space-y-3">
        {menu.map(({ to, label, icon, end }) => (
          <PluginLink
            key={to}
            to={to}
            label={label}
            icon={icon}
            end={end}
            variant="gray"
            className="w-full bg-slate-700 hover:bg-slate-600 shadow hover:shadow-inner"
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
