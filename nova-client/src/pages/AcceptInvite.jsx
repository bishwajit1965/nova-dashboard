import { Eye, EyeOff, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { LucideIcon } from "../lib/LucideIcons";
import api from "../lib/api";
import useValidator from "../hooks/useValidator";

const AcceptInvite = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inviteInfo, setInviteInfo] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  const [form, setForm] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  console.log("Token=>", token, inviteInfo);

  const formData = {
    name: form.name,
    password: form.password,
    confirmPassword: form.confirmPassword,
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchInvite = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get(`/invite/invites/${token}`);
        setInviteInfo(res?.data?.data);
      } catch (err) {
        setError(err.response?.data?.message || "Invalid invite.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchInvite();
  }, [token]);

  useEffect(() => {
    if (!inviteInfo || !inviteInfo.expiresAt) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expiry = new Date(inviteInfo.expiresAt).getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        clearInterval(interval);
        setIsExpired(true);
        setTimeLeft("00:00");
      } else {
        const minutes = Math.floor(diff / 1000 / 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft(
          `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
          )}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [inviteInfo]);

  const validationRules = {
    name: {
      required: "Name is required",
      minLength: {
        value: 2,
        message: "Name must be at least 2 characters",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
        message: "Password must contain at least one letter and one number",
      },
    },
    confirmPassword: {
      required: "Please confirm your password",
      validate: (value, formValues) =>
        value === formValues.password || "Passwords do not match",
    },
  };
  const { errors, validate } = useValidator(validationRules, formData);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const resetLoading = () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    if (!validate()) {
      resetLoading();
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await api.post(`/invite/accept/${token}`, {
        name: form.name,
        password: form.password,
      });

      setSuccess(res?.data?.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        errors.name || errors.password || errors.confirmPassword
          ? "border border-red-400 bg-base-100"
          : ""
      } max-w-md mx-auto lg:my-12 lg:p-8 p-2 bg-base-200 rounded-xl shadow-sm space-y-4`}
    >
      <h2 className="lg:text-2xl text-xl font-bold lg:flex items-center space-x-2">
        <span className="flex items-center space-x-1">
          <LucideIcon.CircleCheckBig className="text-blue-600" />
          <span>Accept Invitation</span>
        </span>
        <span
          className={`${
            errors.name || errors.password || errors.confirmPassword
              ? "text-red-500 visible animate-pulse"
              : "hidden"
          }`}
        >
          Error Found !
        </span>
      </h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      {inviteInfo && (
        <div className="mb-4 text-sm text-gray-700">
          <p>
            You were invited to join the &nbsp; <br />
            <strong>{inviteInfo?.team.name}</strong> as an &nbsp;
            <strong className="capitalize">{inviteInfo?.role.name}</strong>.
          </p>
          <p>
            Email: <strong>{inviteInfo?.email}</strong>
          </p>
          <div className="mb-4">
            {isExpired ? (
              <p className="text-red-600 font-semibold">
                ⛔ This invite time has expired.
              </p>
            ) : (
              <p className="text-gray-600">
                ⏳ Time left to accept: {timeLeft}
              </p>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="">
          <Input
            type="text"
            disabled={!inviteInfo}
            name="name"
            placeholder="Your full name..."
            value={form.name}
            onChange={handleChange}
            className={`${
              errors.name
                ? "input-error bg-yellow-100 text-red-500 font-bold animate-pulse"
                : ""
            } input input-bordered w-full`}
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            disabled={!inviteInfo}
            name="password"
            placeholder="Password"
            className={`${
              errors.password
                ? "input-error bg-yellow-100 text-red-500 font-bold animate-pulse"
                : ""
            } input input-bordered w-full`}
            value={form.password}
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
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            disabled={!inviteInfo}
            placeholder="Confirm Password"
            className={`${
              errors.confirmPassword
                ? "input-error bg-yellow-100 text-red-500 font-bold animate-pulse"
                : ""
            } input input-bordered w-full`}
            value={form.confirmPassword}
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

        <div
          className={`transition-opacity duration-300 ${
            loading
              ? "cursor-not-allowed opacity-100"
              : "cursor-pointer opacity-100"
          }`}
        >
          <Button
            type="submit"
            variant="primary"
            disabled={loading || !inviteInfo}
            className="btn w-full"
          >
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <LucideIcon.MailPlus />
            )}
            {loading ? "Accepting Invite..." : "Accept Invite"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AcceptInvite;
