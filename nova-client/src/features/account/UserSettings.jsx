import Button from "../../components/ui/Button";
import ChangePasswordForm from "./ChangePasswordForm";
import { Input } from "../../components/ui/Input";
import { LucideIcon } from "../../lib/LucideIcons";
import Textarea from "../../components/ui/Textarea";
import useApiMutation from "../../hooks/useApiMutation";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

const UserSettings = () => {
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
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
        <div className="bg-base-300 shadow w-10 h-10 rounded-full flex items-center justify-center mr-2">
          <LucideIcon.UserRoundPen size={25} />
        </div>
        My Profile (Admin)
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block label-text text-sm font-medium">Name</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block label-text text-sm font-medium">Email</label>

          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <Textarea
            value={formData.bio}
            label="Short Bio"
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
      <div className="divider">Change Password</div>

      <ChangePasswordForm />
    </div>
  );
};

export default UserSettings;
