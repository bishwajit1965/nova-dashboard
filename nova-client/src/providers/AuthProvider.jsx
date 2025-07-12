import { useEffect, useState } from "react";

import AuthContext from "../authContext/AuthContext";
import api from "../lib/api"; // Axios instance with credentials
import { initializeGoogleSDK } from "../utils/googleSdk";
import toast from "react-hot-toast";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateUserPlan = (newPlan) => {
    setUser((prevUser) =>
      prevUser ? { ...prevUser, plan: newPlan } : prevUser
    );
  };
  // Check auth status on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1) refresh session (keeps your original flow)
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

  const register = async ({ name, email, password }) => {
    const res = await api.post(
      "/auth/register",
      { name, email, password },
      { withCredentials: true }
    );
    const user = res.data?.user;
    if (!user) {
      throw new Error("Registration failed. Please check your credentials.");
    }
    // ⬇️ Attach token to Axios instance
    setUser(user);
    setIsAuthenticated(true);
    return user;
  };

  const login = async (email, password) => {
    const res = await api.post(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );
    const user = res.data?.user;
    if (!user) {
      throw new Error("Login failed. Please check your credentials.");
    }
    // ⬇️ Attach token to Axios instance
    setUser(user);
    setIsAuthenticated(true);
    return user;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Try again.");
    }
  };
  useEffect(() => {
    initializeGoogleSDK();
  }, []);

  const authInfo = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    register,
    login,
    logout,
    loading,
    updateUserPlan,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
