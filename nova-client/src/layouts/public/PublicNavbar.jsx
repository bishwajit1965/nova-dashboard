import { ArrowDown, Moon, Sun } from "lucide-react";
import { FaHome, FaPortrait, FaSign, FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";

import Image from "/assets/bishwajit-1.jpg";
import Logo from "../../components/ui/Logo";
import api from "../../lib/api";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

const PublicNavbar = ({ siteSettings }) => {
  const { logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
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
  ];
  return (
    <div className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar lg:max-w-7xl w-full mx-auto lg:px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle lg:hidden block"
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
              {links?.map((l) => (
                <NavLink
                  to={l.connect}
                  key={l.id}
                  className="flex items-center space-x-1"
                >
                  <span className="text-xl flex items-center space-x-1 capitalize">
                    20 16 8 24 5 20 {l.icon}
                    {l.name}
                  </span>
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="hidden lg:block">
            <Link to="/">
              <img src={siteSettings?.logoUrl} alt="" className="w-10 h-10" />

              {/* <Logo /> */}
            </Link>
          </div>
          <div className="hidden lg:block lg:ml-6">
            <div className="flex items-center lg:space-x-4 space-x-2">
              {links?.map((l) => (
                <NavLink
                  to={l.connect}
                  key={l.id}
                  className="flex-inline items-center space-x-1"
                >
                  <span className="flex-inline text-xl items-center space-x-1 capitalize">
                    <span className="flex items-center space-x-1">
                      <span>{l.icon}</span>
                      <span className="">{l.name}</span>
                    </span>
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* <div className="navbar-center"></div> */}
        <div className="navbar-end">
          <div className="flex justify-end p-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-800" />
              )}
            </button>
          </div>
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <ArrowDown />

              <img src={Image} alt="" className="w-10 h-10 rounded-full" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-xl"
            >
              {isAuthenticated ? (
                <li className="text-base-content text-xl">
                  <a onClick={handleLogout} className="text-[16px]">
                    <FaSignOutAlt /> Log out
                  </a>
                </li>
              ) : (
                <li className="text-base-content text-xl">
                  <a href="/login" className="text-[16px]">
                    <FaSign /> Login
                  </a>
                </li>
              )}
              <li className="text-base-content text-xl">
                <a className="text-[16px]">
                  <FaPortrait />
                  Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicNavbar;
