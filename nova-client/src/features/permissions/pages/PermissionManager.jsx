import Button from "../../../components/ui/Button";
import { LucideIcon } from "../../../lib/LucideIcons";
import PermissionForm from "../components/PermissionForm";
import PermissionList from "../components/PermissionList";
import { useState } from "react";

export default function PermissionManager() {
  const [editingData, setEditingData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Manage Permissions</h1>
        <Button
          onClick={() => {
            setEditingData(null); // create mode
            setShowForm(true);
          }}
          className="btn btn-primary mb-4"
          icon={LucideIcon.SquarePlus}
        >
          Add Permission
        </Button>
      </div>

      {showForm && (
        <PermissionForm
          existing={editingData}
          onClose={() => {
            setShowForm(false);
            setEditingData(null);
          }}
          onEditing={setEditingData}
        />
      )}

      <PermissionList
        onEdit={(permission) => {
          setEditingData(permission); // load data for editing
          setShowForm(true);
        }}
      />
    </div>
  );
}
