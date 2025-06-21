import Button from "../../components/ui/Button";
import ChangePasswordForm from "./ChangePasswordForm";
import { Input } from "../../components/ui/Input";
import { LucideIcon } from "../../lib/LucideIcons";
import { RotateCcwKey } from "lucide-react";
import Textarea from "../../components/ui/Textarea";
import useApiMutation from "../../hooks/useApiMutation";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

const UserSettings = () => {
  const [isOpenPasswordReset, setIsOpenPasswordReset] = useState(false);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
  });

  const { mutate, isPending } = useApiMutation({
    url: "/users/profile",
    method: "patch",
    onSuccess: () => {
      setFormData({
        bio: "",
      });
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, bio } = formData;
    mutate({ name, email, bio }), console.log("Updated info:", formData);
  };
  return (
    <div className="lg:max-w-2xl mx-auto lg:p-6 space-y-4">
      <div className="flex items-center justify-between bg-base-100 p-2 shadow-sm rounded-md">
        <h2 className="lg:text-2xl text-xl font-bold flex items-center space-x-2">
          <span className="bg-info shadow w-10 h-10 rounded-full flex items-center justify-center mr-2">
            {isOpenPasswordReset ? (
              <LucideIcon.RotateCcwKey />
            ) : (
              <LucideIcon.UserRoundPen />
            )}
          </span>
          {isOpenPasswordReset ? (
            <span>Reset Password ({user?.name})</span>
          ) : (
            <span>My Profile ({user?.name})</span>
          )}
        </h2>
        {/* Password reset form opener */}
        <Button
          onClick={() => setIsOpenPasswordReset(!isOpenPasswordReset)}
          icon={LucideIcon.FolderOpen}
          variant="primary"
        >
          {isOpenPasswordReset ? "Open My Profile" : "Reset Password"}
        </Button>
      </div>

      {!isOpenPasswordReset && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Name
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Email
            </label>

            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="" className="text-sm text-gray-600">
              Short Bio
            </label>
            <Textarea
              value={formData.bio}
              name="bio"
              placeholder="Tell us about yourself..."
              onChange={handleChange}
              error={formData.bio.length > 500 ? "Too long!" : undefined}
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            icon={LucideIcon.SquarePen}
            className="btn-primary cursor-pointer w-full font-bold"
          >
            {isPending ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      )}

      {/* Password reset form */}
      {isOpenPasswordReset && <ChangePasswordForm />}
    </div>
  );
};

export default UserSettings;
