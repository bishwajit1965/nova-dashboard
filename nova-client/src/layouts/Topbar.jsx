import { Home, UsersIcon, X } from "lucide-react";
import { LogIn, LogOut, SquareMenu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../components/ui/Logo";
import ThemeToggle from "../components/ui/ThemeToggle";
import api from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import { FaSignOutAlt } from "react-icons/fa";
import Image from "/assets/bishwajit-1.jpg";

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
  const { isAuthenticated, user, logout } = useAuth();
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
        {/* <div className="invisible lg:visible">Menu One</div>
        <div className="invisible lg:visible">Menu Two</div>
        <div className="invisible lg:visible">Menu Three</div> */}
        {/* <div className="flex items-center justify-end">
          <ThemeToggle />
        </div> */}
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
      </div>
      <div className="flex justify-end mr-6 w-full">
        <ThemeToggle />
      </div>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img src={Image} alt="Tailwind CSS Navbar component" />
          </div>
        </div>
        <ul
          tabIndex="-1"
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>Name: {user.name}</li>
          <li>Role: {user.roles[0]}</li>
          <li>Email: {user.email}</li>
          <li onClick={handleLogout}>
            {isAuthenticated ? (
              <button className="p-0">
                <FaSignOutAlt /> Logout
              </button>
            ) : (
              <a href="/login">Login</a>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Topbar;
