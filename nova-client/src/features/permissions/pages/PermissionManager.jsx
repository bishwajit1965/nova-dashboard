import Button from "../../../components/ui/Button";
import { LucideIcon } from "../../../lib/LucideIcons";
import PermissionForm from "../components/PermissionForm";
import PermissionList from "../components/PermissionList";
import { useDocumentHead } from "../../../hooks/useDocumentHead";
import { useState } from "react";

export default function PermissionManager() {
  useDocumentHead("Admin Permission Management • Nova Dashboard", [
    { name: "description", content: "Create and update permission" },
  ]);
  const [editingData, setEditingData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-7xl mx-auto lg:p-4 p-2 space-y-6">
      <div className="lg:flex lg:space-y-0 space-y-2 justify-between">
        <h1 className="lg:text-2xl text-xl font-bold">Manage Permissions</h1>
        <Button
          onClick={() => {
            setEditingData(null); // create mode
            setShowForm(true);
          }}
          className="btn btn-primary lg:mb-4"
          icon={LucideIcon.SquarePlus}
        >
          Add Permission
        </Button>
      </div>
      {showForm && (
        <div className="bg-base-100 rounded-lg shadow-sm lg:p-4 p-2">
          <PermissionForm
            existing={editingData}
            onClose={() => {
              setShowForm(false);
              setEditingData(null);
            }}
            onEditing={setEditingData}
          />
        </div>
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
