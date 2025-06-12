import API_PATHS from "../../../common/apiPaths/apiPaths";
import AssignRolesPermissions from "./AssignRolesPermissions";
import Button from "../../../components/ui/Button";
import { LucideIcon } from "../../../lib/LucideIcons";
import toast from "react-hot-toast";
import { useApiMutation } from "../../../common/hooks/useApiMutation";
import { useState } from "react";

const UserEditModal = ({ user, roles, permissions, closeModal }) => {
  const [selectedRoles, setSelectedRoles] = useState(
    user.roles?.map((role) => role._id) || []
  );

  const [selectedPermissions, setSelectedPermissions] = useState(
    user.permissions?.map((permission) => permission._id) || []
  );

  const [formData, setFormData] = useState({
    roles: [],
    permissions: [],
  });

  const toggleRole = (roleName) => {
    setSelectedRoles((prev) =>
      prev.includes(roleName)
        ? prev.filter((r) => r !== roleName)
        : [...prev, roleName]
    );
  };

  const togglePermission = (permName) => {
    setSelectedPermissions((prev) =>
      prev.includes(permName)
        ? prev.filter((p) => p !== permName)
        : [...prev, permName]
    );
  };

  const mutation = useApiMutation({
    method: "update",
    path: (payload) => `${API_PATHS.USERS.ENDPOINT}/${payload.userId}`,
    key: API_PATHS.USERS.KEY,

    onSuccess: () => {
      setTimeout(() => {
        closeModal();
        // toast.success("User updated successfully");
      }, 1000);
    },
    onError: (error) => {
      toast.error("Failed to update user");
      console.error(error);
    },
  });

  const handleSubmit = () => {
    const payload = {
      userId: user._id,
      data: {
        ...formData,
        // OR: then do not use ...formdata
        // roles: selectedRoles,
        // permissions: selectedPermissions,
      },
    };
    mutation.mutate(payload);
  };

  return (
    <div className="p-4 bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">Edit Roles & Permissions</h2>

      <AssignRolesPermissions
        roles={roles}
        permissions={permissions}
        onChange={setFormData}
        selectedRoles={selectedRoles}
        selectedPermissions={selectedPermissions}
        toggleRole={toggleRole}
        togglePermission={togglePermission}
      />

      <div className="flex items-center space-x-2 justify-end pt-4 border-t border-base-300 mt-6">
        <Button
          onClick={handleSubmit}
          className="btn btn-sm btn-primary"
          disabled={mutation.isPending}
          loading={mutation.isLoading}
          icon={LucideIcon.Edit}
        >
          {mutation.isPending ? "Updating..." : "Update"}
        </Button>

        <Button
          onClick={closeModal}
          variant="warning"
          icon={LucideIcon.X}
          className="btn btn-sm"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default UserEditModal;
