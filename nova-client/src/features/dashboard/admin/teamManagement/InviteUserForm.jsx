import { useEffect, useState } from "react";

import Button from "../../../../components/ui/Button";
import { Input } from "../../../../components/ui/Input";
import { Loader } from "lucide-react";
import { LucideIcon } from "../../../../lib/LucideIcons";
import api from "../../../../lib/api";
import toast from "react-hot-toast";
import { useAuth } from "../../../../hooks/useAuth";
import useValidator from "../../../../hooks/useValidator";

export default function InviteUserForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableRoles, setAvailableRoles] = useState([]);
  const { user } = useAuth();
  const teamId = user?.team?._id || user.team;
  console.log("Team Id", teamId);
  console.log("User", user);
  console.log("Roles", availableRoles);
  console.log("Role", role);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get(`/teams/${teamId}/roles`);
        setAvailableRoles(res?.data?.roles);
      } catch (err) {
        console.error("Error in fetching roles", err);
        toast.error("Failed to load roles");
      }
    };
    if (teamId) fetchRoles();
  }, [teamId]);

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
  console.log("📦 TeamId from props:", teamId);

  const { errors, validate } = useValidator(validationRules, formData);
  const handleInvite = async (e) => {
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
      await api.post("/teams/invite", { email, role, teamId });
      toast.success("User invited successfully!");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to invite user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="lg:max-w-xl mx-auto space-y-4 p-2 bg-base-200 lg:p-8 rounded-xl shadow-sm">
        <h1 className="lg:text-2xl font-bold flex items-center space-x-1.5">
          <span>
            <LucideIcon.MailPlus />
          </span>
          <span>Invite Users to Team</span>
        </h1>
        <form onSubmit={handleInvite} className="space-y-4">
          <div className="">
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="User's email"
              className={`${
                errors.email ? "input-error bg-yellow-100" : ""
              } input input-bordered w-full`}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <select
            value={role}
            name="role"
            onChange={(e) => setRole(e.target.value)}
            className="select select-bordered w-full"
          >
            {availableRoles.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name.charAt(0).toUpperCase() + r.name.slice(1)}
              </option>
            ))}
          </select>

          <div
            className={`${loading ? "cursor-not-allowed" : "cursor-progress"}`}
          >
            <Button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <LucideIcon.MailPlus />
              )}
              {loading ? "Inviting..." : "Invite User"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
