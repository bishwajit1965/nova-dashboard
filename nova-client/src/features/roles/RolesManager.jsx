import Button from "../../components/ui/Button";
import { LucideIcon } from "../../lib/LucideIcons";
import Modal from "../../components/ui/Modal";
import RoleForm from "./components/RoleForm";
import RoleTable from "./components/RoleTable";
import { useDocumentHead } from "../../hooks/useDocumentHead";
import { useState } from "react";

const RoleManager = () => {
  useDocumentHead("Admin Role Management • Nova Dashboard", [
    { name: "description", content: "Create and update user roles" },
  ]);

  const [editingRole, setEditingRole] = useState(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-7xl mx-auto lg:p-2 p-2 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <LucideIcon.CircleGauge /> Role Management
        </h1>
        <Button
          type="submit"
          onClick={() => {
            setEditingRole(null);
            setShowForm(true);
          }}
          variant="primary"
          size="sm"
          icon={LucideIcon.SquarePlus}
          className=""
        >
          Create Role
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
