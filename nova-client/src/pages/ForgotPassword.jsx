import Button from "../components/ui/Button";
import { Loader } from "lucide-react";
import { LucideIcon } from "../lib/LucideIcons";
import api from "../lib/api";
import toast from "react-hot-toast";
import { useState } from "react";
import useValidator from "../hooks/useValidator";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const formData = { email };

  const validationRules = {
    email: {
      required: { message: "Email is required" },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
    },
  };

  const { errors, validate } = useValidator(validationRules, formData);

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
    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("Reset link sent to your email");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="bg-base-200 lg:py-12 p-2 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        <h2 className="text-xl font-bold flex items-center space-x-2">
          <span>
            <LucideIcon.RotateCcwKeyIcon />
          </span>
          <span>Forgot Password ?</span>
          <span>Reset it</span>
        </h2>

        <div className="">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email to send reset link"
            onChange={(e) => setEmail(e.target.value)}
            className={`${
              errors.email ? "input-error bg-yellow-100" : ""
            } input input-bordered w-full`}
          />
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div
          className={`${loading ? "cursor-not-allowed" : "cursor-progress"}`}
        >
          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded btn btn-primary flex items-center disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <LucideIcon.RotateCcwKeyIcon />
            )}
            {loading ? "Sending Reset Link..." : "Send Reset Link"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
