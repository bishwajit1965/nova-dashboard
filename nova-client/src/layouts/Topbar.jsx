import { LogIn, LogOut, SquareMenu } from "lucide-react";

import api from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Topbar = ({ toggleSidebar }) => {
  const { user, isAuthenticated, logout } = useAuth();
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
  console.log("USER", user);
  return (
    <header className="bg-gray-200 border-b border-gray-300 shadow px-4 py-3 flex items-center justify-between w-full">
      <button onClick={toggleSidebar} className="lg:hidden pr-2">
        <SquareMenu size={28} />
      </button>
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="flex justify-around lg:space-x-8 invisible lg:visible">
        <div className="">Menu One</div>
        <div className="">Menu Two</div>
        <div className="">Menu Three</div>
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
    </header>
  );
};

export default Topbar;
