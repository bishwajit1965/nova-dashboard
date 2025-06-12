import API_PATHS from "../../../common/apiPaths/apiPaths";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import Loader from "../../../components/ui/Loader";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import toast from "react-hot-toast";
import { useApiMutation } from "../../../common/hooks/useApiMutation";
import { useApiQuery } from "../../../common/hooks/useApiQuery";
import { useState } from "react";

export default function PermissionList({ onEdit }) {
  const [confirmDelete, setConfirmDelete] = useState(null);

  const {
    data: permissions,
    isLoading,
    isError,
    error,
  } = useApiQuery({
    url: API_PATHS.PERMISSIONS.ENDPOINT,
    queryKey: API_PATHS.PERMISSIONS.KEY,
    // select: (res) => res.data,//NOT NEEDED HERE AS HOOK DOES IT
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  const { mutate: deletePermission } = useApiMutation({
    method: "delete",
    path: (id) => `${API_PATHS.PERMISSIONS.ENDPOINT}/${id}`,
    key: API_PATHS.PERMISSIONS.KEY,
    onSuccess: () => {
      setConfirmDelete(null);
    },
    onError: (error) => {
      toast.error("Error deleting permission");
      setConfirmDelete(null);
      console.error(error);
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <p className="flex justify-center">{isError.message}</p>;
  if (error) return <p className="flex justify-center">{error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Permission Name</th>
              <th>Permission Description</th>
              <th>Created at</th>
              <th className="flex justify-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions?.map((permission, idx) => (
              <tr key={permission._id}>
                <td>{idx + 1}</td>
                <td>{permission.name}</td>
                <td>{permission.description}</td>
                <td>{new Date(permission.createdAt).toLocaleDateString()}</td>
                <td className="space-x-2 flex items-center justify-end">
                  {/* Placeholder for now */}
                  <MiniIconButton
                    onClick={() => onEdit(permission)}
                    disabled={isLoading}
                    icon="edit"
                    variant="primary"
                    className="btn btn-sm"
                  />

                  <MiniIconButton
                    onClick={() => setConfirmDelete(permission)}
                    disabled={isLoading}
                    icon="delete"
                    variant="danger"
                    className="btn btn-sm"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Permission Delete Confirm Dialogue */}
        {confirmDelete && (
          <ConfirmDialog
            isOpen={confirmDelete}
            onClose={() => setConfirmDelete(null)}
            onConfirm={() => deletePermission(confirmDelete._id)}
          />
        )}
      </div>
    </div>
  );
}
