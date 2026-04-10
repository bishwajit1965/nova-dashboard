import { Moon, Sun } from "lucide-react";
import {
  FaHome,
  FaMailBulk,
  FaPortrait,
  FaSign,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import Image from "/assets/bishwajit-1.jpg";
import Logo from "../../components/ui/Logo";
import api from "../../lib/api";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import "./PublicNavbar.css";

const PublicNavbar = ({ siteSettings }) => {
  const { logout, user, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  const links = [
    {
      id: 1,
      icon: <FaHome />,
      name: "home",
      connect: "/",
    },
    {
      id: 2,
      icon: false,
      name: "About Us",
      connect: "/about",
    },
    {
      id: 3,
      icon: false,
      name: "Contact Us",
      connect: "/contact",
    },
    {
      id: 10,
      icon: false,
      name: "Help & support",
      connect: "/help-support",
    },
  ];
  return (
    <div className="navbar bg-base-100 shadow-sm public-navbar lg:max-w-full w-full mx-auto lg:px-24 sticky top-0 z-20 border-b border-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle lg:hidden flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links?.map((l) => {
              const isActive = pathname === l.connect;
              return (
                <NavLink
                  to={l.connect}
                  key={l.id}
                  className={isActive ? "active" : ""}
                >
                  <span className="text-xl flex items-center space-x-1 capitalize">
                    {l.icon}
                    {l.name}
                  </span>
                </NavLink>
              );
            })}
          </ul>
        </div>
        <div className="hidden lg:flex">
          <Link to="/" className="m-0">
            <img src={siteSettings?.logoUrl} alt="" className="w-10" />
            {/* <Logo /> */}
          </Link>
        </div>
        <div className="hidden lg:flex">
          <div className="flex items-center lg:space-x-4 space-x-2">
            {links?.map((l) => {
              const isActive = pathname === l.connect;
              return (
                <NavLink
                  to={l.connect}
                  key={l.id}
                  className={isActive ? "active" : ""}
                >
                  <span className="flex-inline text-lg items-center space-x-1 capitalize">
                    <span className="flex items-center space-x-1">
                      <span>{l.icon}</span>
                      <span className="">{l.name}</span>
                    </span>
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      <div className="dropdown dropdown-end navbar-end space-x-4">
        <div className="flex justify-end">
          <button
            onClick={toggleTheme}
            className="rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === "dark" ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <img src={Image} alt="" className="w-10 rounded-full" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt- w-52 shadow text-xl"
          >
            <li className="text-base-content">
              <a className="text-sm">
                <FaPortrait />
                {user?.name}
              </a>
            </li>
            <li className="text-base-content">
              <a className="text-sm">
                <FaMailBulk />
                {user?.email}
              </a>
            </li>
            <li className="text-base-content">
              <a className="text-sm">
                <FaPortrait />
                Portfolio
              </a>
            </li>
            {isAuthenticated ? (
              <li className="text-base-content">
                <a onClick={handleLogout} className="text-sm">
                  <FaSignOutAlt /> Log out
                </a>
              </li>
            ) : (
              <li className="text-base-content">
                <a href="/login" className="">
                  <FaSign /> Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PublicNavbar;
