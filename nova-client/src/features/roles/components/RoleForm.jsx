import { useEffect, useState } from "react";

import API_PATHS from "../../../common/apiPaths/apiPaths";
import Button from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { LucideIcon } from "../../../lib/LucideIcons";
import Textarea from "../../../components/ui/Textarea";
import toast from "react-hot-toast";
import { useApiMutation } from "../../../common/hooks/useApiMutation";
import useValidator from "../../../hooks/useValidator";

const RoleForm = ({ onSuccess, initialData = {}, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
    }
  }, [initialData]);

  // Validation
  const validationRules = {
    name: {
      required: { message: "Name is required" },
    },

    description: {
      required: { message: "Description is required" }, // <-- Add this line
      custom: (val) =>
        val && val.length > 100
          ? "Description must be less than 100 characters"
          : null,
    },
  };

  // Validator integration
  const { errors, validate } = useValidator(validationRules, {
    name,
    description,
  });

  const mutation = useApiMutation({
    method: initialData ? "update" : "create",
    path: initialData
      ? (data) => `${API_PATHS.ROLES.ENDPOINT}/${data.id}`
      : API_PATHS.ROLES.ENDPOINT,
    key: API_PATHS.ROLES.KEY, // used by useQuery
    onSuccess: (data) => {
      onSuccess?.(data);
      onClose?.();
    },
    onError: (error) => {
      toast.error("Error saving permission");
      console.error(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = initialData
      ? { id: initialData._id, data: { name, description } }
      : { data: { name, description } };

    mutation.mutate(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 max-w-md mx-auto p-4 border border-base-100 bg-base-100 shadow rounded-lg"
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
        {errors.name && (
          <p className="text-red-600 text-xs mt-1">{errors.name}</p>
        )}
      </div>
      <div className="">
        <label className="block text-base-content font-medium mb-1">
          Role Description
        </label>
        <Textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Role description..."
          className={`w-full input-bordered ${
            errors.description || description.length > 80
              ? "border-red-500 animate-pulse"
              : ""
          }`}
          maxLength={100}
        />
        {errors.description && (
          <p className="text-red-600 text-xs mt-1">{errors.description}</p>
        )}
        <div className="text-xs text-right mt-1">
          {description.length}/100{" "}
          {description.length > 80 && (
            <span className="text-warning font-medium">Approaching limit</span>
          )}
        </div>
      </div>
      <div className="flex space-x-2 justify-end pt-2">
        <Button
          type="submit"
          disabled={mutation.isPending}
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
