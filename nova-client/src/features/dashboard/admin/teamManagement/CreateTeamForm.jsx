import Button from "../../../../components/ui/Button";
import { Input } from "../../../../components/ui/Input";
import { Loader } from "lucide-react";
import { LucideIcon } from "../../../../lib/LucideIcons";
import api from "../../../../lib/api";
import toast from "react-hot-toast";
import { useState } from "react";
import useValidator from "../../../../hooks/useValidator";

export default function CreateTeamForm() {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const formData = { name, industry, location };

  const validationRules = {
    name: {
      required: { message: "Team name is required" },
      minLength: {
        value: 2,
        message: "Team name must be at least 2 characters",
      },
    },
    industry: {
      required: { message: "Industry is required" },
    },
    location: {
      required: { message: "Location is required" },
    },
  };

  const { errors, validate } = useValidator(validationRules, formData);

  const handleCreateTeam = async (e) => {
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
      await api.post("/teams/create", {
        name,
        metadata: { industry, location },
      });

      toast.success("Team created successfully!");
      setName("");
      setIndustry("");
      setLocation("");
      // 🔄 Optionally refresh user context here if you track team in auth
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 bg-base-200 lg:p-8 p-2 rounded-xl shadow-md max-w-lg mx-auto lg:my-12 my-4">
      <h2 className="lg:text-2xl text-xl font-bold flex items-center space-x-2">
        <span>
          <LucideIcon.Users />
        </span>
        <span span>
          Create a New Team{" "}
          {errors.name ? (
            <span className="text-red-500">Error Found!</span>
          ) : (
            ""
          )}
        </span>
      </h2>
      <form onSubmit={handleCreateTeam} className="space-y-4">
        <div className="">
          <Input
            type="text"
            name="name"
            placeholder="Team Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${
              errors.name ? "input-error bg-yellow-100" : ""
            } input input-bordered w-full`}
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div className="">
          <Input
            type="text"
            name="industry"
            placeholder="Industry name..."
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className={`${
              errors.industry ? "input-error bg-yellow-100" : ""
            } input input-bordered w-full`}
          />
          {errors.industry && (
            <p className="text-red-600 text-xs mt-1">{errors.industry}</p>
          )}
        </div>

        <div className="">
          <Input
            type="text"
            name="location"
            placeholder="Location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`${
              errors.location ? "input-error bg-yellow-100" : ""
            } input input-bordered w-full`}
          />
          {errors.location && (
            <p className="text-red-600 text-xs mt-1">{errors.location}</p>
          )}
        </div>

        <div
          className={`${
            loading ? "cursor-not-allowed opacity-100" : "cursor-progress"
          }`}
        >
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="btn w-full"
          >
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <LucideIcon.Users />
            )}
            {loading ? "Creating..." : "Create Team"}
          </Button>
        </div>
      </form>
    </div>
  );
}
