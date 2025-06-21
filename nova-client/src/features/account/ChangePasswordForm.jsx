import { Eye, EyeOff } from "lucide-react";

import Button from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import toast from "react-hot-toast";
import useApiMutation from "../../hooks/useApiMutation";
import { useState } from "react";

const ChangePasswordForm = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate, isPending } = useApiMutation({
    url: "/users/change-password",
    method: "put",
    onSuccess: () => {
      toast.success("Password updated successfully.");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update password.");
    },
  });

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return setError("All fields are required.");
    }

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    mutate({ currentPassword, newPassword });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 lg:max-w-2xl">
      <div className="relative">
        <label
          htmlFor="password"
          className="block text-sm text-gray-500 font-medium mb-1"
        >
          Current password
        </label>
        <Input
          type={showCurrentPassword ? "text" : "password"}
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Current Password..."
        />
        <span
          className="absolute right-2 top-8 cursor-pointer z-50"
          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
        >
          {showCurrentPassword ? (
            <EyeOff className="text-gray-400 text-sm" />
          ) : (
            <Eye className="text-gray-400 text-sm" />
          )}
        </span>
      </div>
      <div className="relative">
        <label
          htmlFor="newPassword"
          className="block text-sm text-gray-500 font-medium mb-1"
        >
          New password
        </label>
        <Input
          type={showNewPassword ? "text" : "password"}
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="New Password..."
        />
        <span
          className="absolute right-2 top-8 cursor-pointer z-50"
          onClick={() => setShowNewPassword(!showNewPassword)}
        >
          {showNewPassword ? (
            <EyeOff className="text-gray-400 text-sm" />
          ) : (
            <Eye className="text-gray-400 text-sm" />
          )}
        </span>
      </div>

      <div className="relative">
        <label
          htmlFor="confirmPassword"
          className="block text-sm text-gray-500 font-medium mb-1"
        >
          Confirm password
        </label>
        <Input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm New Password..."
        />
        <span
          className="absolute right-2 top-8 cursor-pointer z-50"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? (
            <EyeOff className="text-gray-400 text-sm" />
          ) : (
            <Eye className="text-gray-400 text-sm" />
          )}
        </span>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-500">{success}</p>}

      <Button
        type="submit"
        disabled={isPending}
        className="btn-primary cursor-pointer w-full"
      >
        {isPending ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
