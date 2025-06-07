import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import Loader from "../../../components/ui/Loader";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import useFetchRoles from "../hooks/useFetchRoles";
import { useState } from "react";

const RoleTable = ({ onEdit, onDelete }) => {
  const { data: roles = [], isLoading } = useFetchRoles();
  const [confirmDelete, setConfirmDelete] = useState(null);

  if (isLoading) return <Loader />;

  if (roles.length === 0)
    return (
      <p className="flex justify-center text-sm text-gray-500">
        No roles found.
      </p>
    );

  return (
    <div className="overflow-x-auto">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Role Name</th>
            <th>Role Description</th>
            <th>Created at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles?.map((role, idx) => (
            <tr key={role._id}>
              <td>{idx + 1}</td>
              <td>{role.name}</td>
              <td>{role.description}</td>
              <td>{new Date(role.createdAt).toLocaleDateString()}</td>
              <td className="space-x-2 flex items-center">
                {/* Placeholder for now */}
                <MiniIconButton
                  onClick={() => onEdit(role)}
                  icon="edit"
                  variant="primary"
                  className="btn btn-sm"
                />

                <MiniIconButton
                  onClick={() => setConfirmDelete(role)}
                  icon="delete"
                  variant="danger"
                  className="btn btn-sm"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Role Delete Confirm Dialogue */}
      {confirmDelete && (
        <ConfirmDialog
          isOpen={confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() => onDelete(confirmDelete._id)}
        />
      )}
    </div>
  );
};

export default RoleTable;
