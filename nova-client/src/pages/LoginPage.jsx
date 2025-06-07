import { Eye, EyeOff, LogIn } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { Input } from "../components/ui/Input";
import api from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="flex items-center justify-center rounded-lg min-h-screen bg-base-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-base-300 shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center">
          <LogIn className="mr-2 font-extrabold" />
          Login
        </h2>
        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <Input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <Input
            type={showPassword ? "text" : "password"}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="absolute right-2 top-9 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>
        <div className="justify-between">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded btn btn-primary flex items-center  ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <LogIn size={18} /> {loading ? "Logging in..." : "Log In"}
          </button>

          <div className="">
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
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
