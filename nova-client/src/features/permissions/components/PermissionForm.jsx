import API_PATHS from "../../../common/apiPaths/apiPaths";
import Button from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { LucideIcon } from "../../../lib/LucideIcons";
import Textarea from "../../../components/ui/Textarea";
import toast from "react-hot-toast";
import { useApiMutation } from "../../../common/hooks/useApiMutation";
import { useState } from "react";
import useSubmitDelayedValue from "../../../common/hooks/useSubmitDelayedValue";
import useValidator from "../../../hooks/useValidator";

export default function PermissionForm({ existing, onClose, onEditing }) {
  const [name, setName] = useState(existing?.name || "");
  const [description, setDescription] = useState(existing?.description || "");

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
    method: existing ? "update" : "create",
    path: existing
      ? (data) => `${API_PATHS.PERMISSIONS.ENDPOINT}/${data.id}`
      : API_PATHS.PERMISSIONS.ENDPOINT,
    key: API_PATHS.PERMISSIONS.KEY, // used by useQuery
    onSuccess: (data) => {
      onEditing?.(data);
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
    const payload = existing
      ? { id: existing._id, data: { name, description } }
      : { data: { name, description } };

    mutation.mutate(payload);
  };

  const delayedIsSubmitting = useSubmitDelayedValue(mutation.isPending, 2000);

  return (
    <div className="lg:max-w-xl max-w-full mx-auto space-y-6 border border-base-300 shadow-sm lg:p-6 rounded-lg lg:mb-10">
      <h2 className="lg:text-3xl text-xl font-bold text-base-content">
        {existing ? "Update Permission" : "Create Permission"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="">
          <Input
            className="input input-bordered w-full"
            placeholder="Permission Name..."
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div className="">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            placeholder="Permission description..."
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
              <span className="text-warning font-medium">
                Approaching limit
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            className="btn btn-md"
            variant="primary"
            type="submit"
            disabled={mutation.isPending}
            loading={mutation.isPending}
            icon={
              delayedIsSubmitting
                ? LucideIcon.Check
                : existing
                ? LucideIcon.Edit
                : LucideIcon.Plus
            }
          >
            {delayedIsSubmitting ? "Saving..." : existing ? "Update" : "Create"}{" "}
          </Button>
          <Button
            type="button"
            icon={LucideIcon.Settings}
            variant="warning"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
