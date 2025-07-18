import { Eye, EyeOff, Loader } from "lucide-react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getFacebookAccessToken,
  initFacebookSDK,
} from "../../utils/facebookSdk";
import { useEffect, useState } from "react";

import Button from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import Logo from "../../components/ui/Logo";
import { LucideIcon } from "../../lib/LucideIcons";
import api from "../../lib/api";
import { getGoogleIdToken } from "../../utils/googleAuth";
import { initializeGoogleSDK } from "../../utils/googleSdk";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import useValidator from "../../hooks/useValidator";

const Login = () => {
  const { login, setUser, setIsAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [activeMethod, setActiveMethod] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  // Validation Rules
  const formData = { email, password };

  useEffect(() => {
    initializeGoogleSDK();
  }, []);

  useEffect(() => {
    initFacebookSDK();
  }, []);

  const validationRules = {
    email: {
      required: { message: "Email is required" },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
    },
    password: {
      required: { message: "Password is required" },
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?#&^]).{6,}$/,
        message:
          "Password must include uppercase, lowercase, number, and special character",
      },
    },
  };

  const { errors, validate } = useValidator(validationRules, formData);

  const handleLogin = async (event, method) => {
    if (method === "email") event.preventDefault();
    setActiveMethod(method);
    setLoading(true);

    const resetLoading = () => {
      setLoading(false);
      setActiveMethod(null);
    };

    let loggedInUser = null;

    try {
      switch (method) {
        case "email": {
          if (!validate()) {
            resetLoading();
            return;
          }

          loggedInUser = await login(email, password, rememberMe);
          console.log("Logged in user:", loggedInUser);
          break;
        }

        case "google": {
          const token = await getGoogleIdToken();
          if (!token) {
            resetLoading();
            return;
          }

          const res = await api.post("/auth/oauth/google", { code: token });
          loggedInUser = res?.data?.user;
          break;
        }

        case "facebook": {
          const token = await getFacebookAccessToken();
          if (!token) {
            resetLoading();
            return;
          }

          const res = await api.post("/auth/oauth/facebook", { token });
          loggedInUser = res?.data?.user;
          break;
        }

        default:
          throw new Error("Invalid login method");
      }

      if (loggedInUser) {
        setUser(loggedInUser);
        setIsAuthenticated(true);
        toast.success("Login is successful!");
        // Store user in localStorage or sessionStorage based on rememberMe
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("user", JSON.stringify(loggedInUser));

        const userRoles = loggedInUser.roles || [];
        const redirectTo =
          userRoles.includes("admin") || userRoles.includes("editor")
            ? from
            : "/";
        navigate(redirectTo, { replace: true });
        setIsError(false);
        setMessage("✅ Login successful!");
      } else {
        throw new Error("User not returned from login");
      }
    } catch (error) {
      console.error("Login error", error);
      setIsError(true);
      const errMsg =
        error.response?.data?.message || "Login failed. Try again.";
      setMessage(errMsg);
      toast.error(errMsg);
    } finally {
      setTimeout(() => {
        resetLoading();
        setMessage("");
      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center rounded-lg lg:min-h-screen lg:p-4 p-2 bg-linear-to-r/shorter from-sky-300 to-indigo-300">
      <div className="bg-base-300 shadow-md rounded-lg px-8 pt-6 pb-6 w-full lg:max-w-sm lg:space-y-3 space-y-2">
        <Logo />
        <div className="divider py-0 my-0"></div>
        <div className="lg:space-y-2">
          <h2 className="lg:text-2xl font-bold text-center flex items-center space-x-2">
            <span>
              <LucideIcon.LogIn size={25} />
            </span>
            <span className="text-base-content font-extrabold">
              Login with{" "}
            </span>
            <span className="text-base-content font-extrabold">ND</span>
            <span className="text-blue-700 font-extrabold">LTS</span>
          </h2>
        </div>

        <form className="lg:space-y-3 space-y-2">
          <div className="">
            <Input
              name="email"
              icon={LucideIcon.Mail}
              type="email"
              placeholder="Email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <Input
              name="password"
              icon={LucideIcon.Lock}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password..."
            />
            <span
              className="absolute right-2 top-2 cursor-pointer z-50"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="text-gray-300" />
              ) : (
                <Eye className="text-gray-300" />
              )}
            </span>
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <input
                type="checkbox"
                className="checkbox checkbox-xs checkbox-primary"
                name=""
                id=""
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span className="text-indigo">
                Remember{" "}
                <Link to="">
                  <span className="text-blue-800 font-bold">me</span>{" "}
                </Link>
              </span>
            </div>
            <div className="">
              <Button
                onClick={(e) => handleLogin(e, "email")}
                type="button"
                disabled={activeMethod === "email"}
                variant="primary"
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded btn btn-primary flex items-center  ${
                  activeMethod === "email"
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {activeMethod === "email" ? (
                  <Loader className="animate-spin" />
                ) : (
                  <LucideIcon.Users />
                )}
                {activeMethod === "email" ? "Logging In ..." : " Log In"}{" "}
              </Button>
            </div>
          </div>
          <div className="justify-between">
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
        <div className="divider p-0 my-2">OR</div>
        <div className="w-full lg:space-y-3 space-y-2">
          <div className="block">
            <Button
              variant="primary"
              className="w-full"
              onClick={(e) => handleLogin(e, "facebook")}
              disabled={activeMethod === "facebook"}
            >
              {activeMethod === "facebook" ? (
                <Loader className="animate-spin" />
              ) : (
                <FaFacebook />
              )}
              {activeMethod === "facebook"
                ? "Logging In ..."
                : " Log In with Facebook"}
            </Button>
          </div>
          <div className="block">
            <Button
              type="submit"
              onClick={(e) => handleLogin(e, "google")}
              disabled={activeMethod === "google"}
              variant="danger"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded btn btn-primary flex items-center  ${
                activeMethod === "google" ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {activeMethod === "google" ? (
                <Loader className="animate-spin" />
              ) : (
                <FaGoogle />
              )}
              {activeMethod === "google"
                ? "Logging In ..."
                : "  Log in with Google"}
            </Button>
          </div>
        </div>

        <p className="text-sm text-center">
          <span className="mr-1">Forgot password ?</span>
          <Link to="/forgot-password" className="text-blue-600 underline">
            Reset password here
          </Link>
        </p>
        <p className="text-sm text-center">
          New to this site ?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register here
          </Link>
        </p>
        <div className="divider m-0 p-0"></div>
        <p className="mt-2 text-center text-xs text-base-content/60">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-indigo-500 font-bold">Nova Dashboard LTS</span>{" "}
          . All rights reserved. <script></script>
        </p>
      </div>
    </div>
  );
};

export default Login;
