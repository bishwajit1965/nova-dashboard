import { Home, UsersIcon, X } from "lucide-react";
import { LogIn, LogOut, SquareMenu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import Logo from "../components/ui/Logo";
import ThemeToggle from "../components/ui/ThemeToggle";
import api from "../lib/api";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  {
    to: "/",
    label: "Home",
    icon: Home,
    end: true,
  },
  {
    to: "/dashboard/users",
    label: "Contact",
    icon: UsersIcon,
  },
];

const Topbar = ({ toggleSidebar, leftSidebarToggler }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-base-200 border-b border-base-300 shadow px-4 py-3 flex items-center justify-between w-full">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="lg:hidden pr-2">
          <SquareMenu size={28} />
        </button>
        <h2 className="text-xl font-bold flex text-base-content items-center invisible lg:visible lg:mr-6">
          <span className="tooltip tooltip-right" data-tip="Hide sidebar">
            <SquareMenu
              size={25}
              onClick={leftSidebarToggler}
              className="tooltip"
              data-tip="Hide sidebar"
            />
          </span>
          <span className="ml-6">
            <Logo />
          </span>
        </h2>
        <ul className="flex space-x-4">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-base-300 text-primary"
                      : "text-base-content hover:bg-base-200"
                  }`
                }
              >
                {Icon && <Icon size={18} />}
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-around lg:space-x-8">
        <div className="invisible lg:visible">Menu One</div>
        <div className="invisible lg:visible">Menu Two</div>
        <div className="invisible lg:visible">Menu Three</div>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
        <div className="visible lg:invisible lg:mr-0 mr-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 flex items-center"
            >
              <LogOut size={18} color="white" className="mr-2" /> Logout
            </button>
          ) : (
            <a
              href="/login"
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 flex items-center"
            >
              <LogIn size={18} color="white" className="mr-2" /> Login
            </a>
          )}
        </div>
        <div className="lg:visible invisible sm:visible lg:mr-0 mr-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 flex items-center"
            >
              <LogOut size={18} color="white" className="mr-2" /> Logout
            </button>
          ) : (
            <a
              href="/login"
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 flex items-center"
            >
              <LogIn size={18} color="white" className="mr-2" /> Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
