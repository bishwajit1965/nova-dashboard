import { useEffect, useState } from "react";

import AuthContext from "../authContext/AuthContext";
import api from "../lib/api"; // Axios instance with credentials
import toast from "react-hot-toast";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Check auth status on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/refresh"); // or /auth/refresh
        const newAccessToken = res.data.accessToken;

        // ⬇️ Attach token to Axios instance
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        console.log("✅ Session refreshed:", res.data.user);
        setUser(res.data.user);
        setIsAuthenticated(true);
        toast.success("🔒 Session restored"); // ✅ Toast on success
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
        console.log("Error found", err);
        toast.error("⚠️ Session expired, please log in again"); // ❌ Toast on failure
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.post(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );
    setUser(res.data.user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await api.post("/auth/logout", {}, { withCredentials: true });
    setUser(null);
    setIsAuthenticated(false);
  };

  const authInfo = {
    user,
    isAuthenticated,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
