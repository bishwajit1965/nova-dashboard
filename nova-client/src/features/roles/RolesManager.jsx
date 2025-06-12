import Button from "../../components/ui/Button";
import { LucideIcon } from "../../lib/LucideIcons";
import Modal from "../../components/ui/Modal";
import RoleForm from "./components/RoleForm";
import RoleTable from "./components/RoleTable";
import { useState } from "react";

const RoleManager = () => {
  const [editingRole, setEditingRole] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
      />

      {showForm && (
        <Modal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          title={editingRole ? "Update Role" : "Add Role"}
        >
          <RoleForm
            initialData={editingRole}
            onClose={() => setShowForm(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default RoleManager;
