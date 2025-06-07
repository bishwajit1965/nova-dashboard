import Button from "../../components/ui/Button";
import { LucideIcon } from "../../lib/LucideIcons";
import Modal from "../../components/ui/Modal";
import RoleForm from "./components/RoleForm";
import RoleTable from "./components/RoleTable";
import { useCreateRole } from "./hooks/useCreateRole";
import { useDeleteRole } from "./hooks/useDeleteRole";
import { useState } from "react";
import { useUpdateRole } from "./hooks/useUpdateRole";

const RoleManager = () => {
  const [editingRole, setEditingRole] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const createRole = useCreateRole({
    onSuccess: () => setShowForm(false),
  });

  const updateRole = useUpdateRole({
    onSuccess: () => setShowForm(false),
  });

  const deleteRole = useDeleteRole();

  const handleSubmit = (data) => {
    if (editingRole) {
      updateRole.mutate({ id: editingRole._id, data });
    } else {
      createRole.mutate(data);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Role Management</h1>
        <Button
          type="submit"
          onClick={() => {
            setEditingRole(null);
            setShowForm(true);
          }}
          variant="primary"
          icon={LucideIcon.SquarePlus}
          className="btn btn-md"
        >
          Add Role
        </Button>
      </div>

      <RoleTable
        onEdit={(role) => {
          setEditingRole(role);
          setShowForm(true);
        }}
        onDelete={(id) => deleteRole.mutate(id)}
      />

      {showForm && (
        <Modal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          title={editingRole ? "Update Role" : "Add Role"}
        >
          <RoleForm
            initialData={editingRole}
            onSubmit={handleSubmit}
            onClose={() => setShowForm(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default RoleManager;
