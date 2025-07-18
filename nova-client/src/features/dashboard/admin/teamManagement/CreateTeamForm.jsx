import Button from "../../../../components/ui/Button";
import { Input } from "../../../../components/ui/Input";
import { LucideIcon } from "../../../../lib/LucideIcons";
import api from "../../../../lib/api";
import toast from "react-hot-toast";
import { useState } from "react";

export default function CreateTeamForm() {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    setLoading(true);

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
    <div className="space-y-4 bg-base-200 lg:p-8 p-2 rounded-xl shadow-md max-w-lg mx-auto">
      <h2 className="lg:text-2xl text-xl font-bold flex items-center space-x-2">
        <span>
          <LucideIcon.CirclePlus />
        </span>
        <span>Create a New Team</span>
      </h2>
      <form onSubmit={handleCreateTeam} className="space-y-4">
        <Input
          type="text"
          placeholder="Team Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          type="text"
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <Button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Creating..." : "Create Team"}
        </Button>
      </form>
    </div>
  );
}
