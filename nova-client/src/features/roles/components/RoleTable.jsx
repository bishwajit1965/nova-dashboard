import API_PATHS from "../../../common/apiPaths/apiPaths";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import Loader from "../../../components/ui/Loader";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import toast from "react-hot-toast";
import { useApiMutation } from "../../../common/hooks/useApiMutation";
import { useApiQuery } from "../../../common/hooks/useApiQuery";
import { useState } from "react";

const RoleTable = ({ onEdit }) => {
  const { data: roles, isLoading } = useApiQuery({
    url: `${API_PATHS.ROLES.ENDPOINT}`,
    queryKey: `${API_PATHS.ROLES.KEY}`,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  const { mutate: deleteRole } = useApiMutation({
    method: "delete",
    path: (id) => `${API_PATHS.ROLES.ENDPOINT}/${id}`,
    key: API_PATHS.ROLES.KEY,
    onSuccess: () => {
      setConfirmDelete(null);
    },
    onError: (error) => {
      toast.error("Error deleting permission");
      setConfirmDelete(null);
      console.error(error);
    },
  });

  const [confirmDelete, setConfirmDelete] = useState(null);

  if (isLoading) return <Loader />;

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
          onConfirm={() => deleteRole(confirmDelete._id)}
        />
      )}
    </div>
  );
};

export default RoleTable;
