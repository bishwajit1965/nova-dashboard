import { useLocation, useNavigate } from "react-router-dom";

import { LogIn } from "lucide-react";
import api from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      await login(email, password);
      setIsError(false);
      setMessage("✅ Login successful! You can now access protected routes.");
      navigate(from, { replace: true });
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || "❌ Login failed.");
    }
    // 🔐 Integrate login logic here
    console.log("Login submitted:", { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded btn btn-primary flex items-center  ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <LogIn size={18} /> {loading ? "Logging in..." : "Log In"}
          </button>

          {message && (
            <p
              className={`mt-4 text-center text-sm ${
                isError ? "text-red-500" : "text-green-600"
              } transition-all`}
            >
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
