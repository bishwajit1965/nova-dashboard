import { PERMISSIONS_ENDPOINT, PERMISSIONS_KEY } from "../api/permissionApi";

import Button from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { LucideIcon } from "../../../lib/LucideIcons";
import Textarea from "../../../components/ui/Textarea";
import toast from "react-hot-toast";
import { useApiMutation } from "../../../common/hooks/useApiMutation";
import { useState } from "react";

export default function PermissionForm({ existing, onSuccess, onClose }) {
  const [name, setName] = useState(existing?.name || "");
  const [description, setDescription] = useState(existing?.description || "");

  const mutation = useApiMutation({
    method: existing ? "update" : "create",
    path: existing
      ? (data) => `${PERMISSIONS_ENDPOINT}/${data.id}`
      : PERMISSIONS_ENDPOINT,
    key: PERMISSIONS_KEY,
    onSuccess: () => {
      toast.success(existing ? "Permission updated!" : "Permission created!");
      onSuccess?.();
      onClose?.();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = existing
      ? { id: existing._id, data: { name, description } }
      : { data: { name, description } };

    mutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="">
        <Input
          className="input input-bordered w-full"
          placeholder="Permission Name..."
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          placeholder="Permission description..."
        />
      </div>
      <div className="flex items-center space-x-4">
        <Button
          className="btn"
          variant="primary"
          type="submit"
          disabled={mutation.isLoading}
          icon={
            mutation.isLoading
              ? LucideIcon.Check
              : existing
              ? LucideIcon.Edit
              : LucideIcon.Plus
          }
        >
          {mutation.isLoading ? "Saving..." : existing ? "Update" : "Create"}{" "}
        </Button>
        <Button
          type="button"
          icon={LucideIcon.Settings}
          variant="warning"
          onClick={onClose}
          className="btn"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
