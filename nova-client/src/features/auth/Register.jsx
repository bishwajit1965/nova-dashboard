import { Eye, EyeOff, Loader } from "lucide-react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getGoogleIdToken, initializeGoogleSDK } from "../../utils/googleSdk";
import { useCallback, useEffect } from "react";

import Button from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import Logo from "../../components/ui/Logo";
import { LucideIcon } from "../../lib/LucideIcons";
import api from "../../lib/api";
import { getFacebookAccessToken } from "../../utils/facebookSdk";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import useValidator from "../../hooks/useValidator";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeMethod, setActiveMethod] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const { register, setUser, setIsAuthenticated } = useAuth();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  console.log("Form data", form);
  const validationRules = {
    name: {
      required: { message: "Name is required" },
      minLength: { value: 2, message: "Name must be at least 2 characters" },
      pattern: {
        value: /^[a-zA-Z\s\-']+$/,
        message: "Name can only contain letters and spaces",
      },
    },
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
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^.\-])[A-Za-z\d@$!%*?#&^.\-]{6,}$/,
        message:
          "Password must include uppercase, lowercase, number, and special character",
      },
    },
    confirmPassword: {
      required: { message: "Please confirm your password" },
      custom: (value, formData) =>
        value !== formData.password ? "Passwords do not match" : null,
    },
  };

  // Validator integration
  const { errors, validate } = useValidator(validationRules, form);
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  useEffect(() => {
    initializeGoogleSDK();
  }, []);

  const handleRegister = useCallback(
    async (e, method) => {
      if (method === "email") e.preventDefault();

      setActiveMethod(method);
      setLoading(true);

      try {
        switch (method) {
          case "email": {
            if (!validate()) {
              setLoading(false);
              setActiveMethod(null);
              return;
            }
            if (form.password !== form.confirmPassword) {
              toast.error("Passwords do not match");
              setLoading(false);
              setActiveMethod(null);
              return;
            }
            await register(form);
            toast.success("Registration is successful!");

            break;
          }
          case "google": {
            const id_token = await getGoogleIdToken();
            console.log("🟡 Received Google ID token:", id_token);

            const res = await api.post("/auth/oauth/google-signup", {
              id_token,
            });
            const user = res?.data?.user;
            if (user) {
              setUser(user);
              setIsAuthenticated(true);
              toast.success("Registered with Google");
            }
            break;
          }
          case "facebook": {
            const token = await getFacebookAccessToken();
            if (!token) return;
            const res = await api.post("/auth/oauth/facebook-signup", {
              token,
            });
            const user = res?.data?.user;
            if (user) {
              setUser(user);
              setIsAuthenticated(true);
              toast.success("Registered with Facebook");
            }
            break;
          }
          default:
            throw new Error("Invalid method");
        }
        navigate(from, { replace: true });
        setIsError(false);
        setMessage("✅ Login successful!");
        setForm({ name: "", email: "", password: "", confirmPassword: "" });
      } catch (error) {
        console.error("Register error:", error);
        const msg = error.response?.data?.message || "Registration failed.";
        toast.error(msg);
      } finally {
        setTimeout(() => {
          setLoading(false);
          setActiveMethod(null);
        }, 2000);
      }
    },
    [form, from, navigate, register, setIsAuthenticated, validate, setUser]
  );

  return (
    <div className="flex items-center justify-center rounded-lg lg:min-h-screen lg:p-4 p-2 bg-linear-to-r/shorter from-sky-300 to-indigo-300">
      <div className="bg-base-300 shadow-md rounded-lg px-8 pt-5 pb-5 w-full lg:max-w-sm lg:space-y-2 space-y-2">
        {/* Logo begins */}
        <Logo />
        <div className="divider py-0 my-0"></div>
        <div className="lg:space-y-2">
          <h2 className="lg:text-2xl font-bold text-center flex items-center space-x-2">
            <span>
              <LucideIcon.User size={25} />
            </span>
            <span className="text-base-content font-extrabold">
              Register with{" "}
            </span>
            <span className="text-base-content font-extrabold">ND</span>
            <span className="text-blue-700 font-extrabold">LTS</span>
          </h2>
        </div>
        <form
          onSubmit={(e) => handleRegister(e, "email")}
          className="lg:space-y-2 space-y-2"
        >
          <div className="">
            <Input
              type="text"
              name="name"
              value={form?.name}
              icon={LucideIcon.User}
              placeholder="Full Name..."
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-600 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div className="">
            <Input
              type="email"
              icon={LucideIcon.Mail}
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={form?.email}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="relative">
            <Input
              name="password"
              value={form?.password}
              icon={LucideIcon.Lock}
              type={showPassword ? "text" : "password"}
              placeholder="Password..."
              onChange={handleChange}
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
          <div className="relative">
            <Input
              name="confirmPassword"
              value={form?.confirmPassword}
              icon={LucideIcon.Lock}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password..."
              onChange={handleChange}
            />
            <span
              className="absolute right-2 top-2 cursor-pointer z-50"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="text-gray-300" />
              ) : (
                <Eye className="text-gray-300" />
              )}
            </span>
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <input
                type="checkbox"
                className="checkbox checkbox-xs checkbox-primary"
                name=""
                id=""
              />
              <span className="text-indigo">
                I agree to the{" "}
                <Link to="">
                  <span className="text-blue-800 font-bold">terms</span>{" "}
                </Link>
              </span>
            </div>

            <div className="">
              <Button
                onClick={(e) => handleRegister(e, "email")}
                type="submit"
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
                {activeMethod === "email" ? "Registering..." : " Register"}{" "}
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
        <div className="w-full lg:space-y-2 space-y-2">
          <div className="">
            <Button
              onClick={() => handleRegister(null, "facebook")}
              disabled={loading && activeMethod === "facebook"}
              variant="primary"
              className="w-full"
            >
              <FaFacebook /> Register with Facebook
            </Button>
          </div>
          <div className="w-full">
            <Button
              onClick={() => handleRegister(null, "google")}
              disabled={loading && activeMethod === "google"}
              variant="danger"
              className="w-full"
            >
              <FaGoogle /> Register with Google
            </Button>
          </div>
        </div>
        <p className="text-sm text-center">
          Already have an account ?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Log in here
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

export default Register;
