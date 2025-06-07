import { useEffect, useState } from "react";

import Button from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { LucideIcon } from "../../../lib/LucideIcons";
import Textarea from "../../../components/ui/Textarea";

const RoleForm = ({ onSubmit, initialData = {}, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!description.trim()) return;
    onSubmit({ name, description });

    setName(""); // reset after submission
    setDescription("");
  };

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
    }
  }, [initialData]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-6 border border-base-100 bg-base-100 shadow rounded-lg"
    >
      <div>
        <label className="block text-base-content font-medium mb-1">
          Role Name
        </label>
        <Input
          type="text"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Role name..."
        />
      </div>
      <div className="">
        <Textarea
          type="text"
          className="input input-bordered w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Role description..."
        />
      </div>
      <div className="flex space-x-2">
        <Button
          type="submit"
          className="btn btn-sm"
          icon={initialData ? LucideIcon.Edit : LucideIcon.Plus}
          variant="primary"
        >
          {initialData ? "Update" : "Add Role"}
        </Button>

        <Button
          onClick={onClose}
          type="submit"
          className="btn btn-sm"
          icon={LucideIcon.X}
          variant="warning"
        >
          Close
        </Button>
      </div>
    </form>
  );
};

export default RoleForm;
