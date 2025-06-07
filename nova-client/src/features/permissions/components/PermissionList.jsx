import { PERMISSIONS_ENDPOINT, PERMISSIONS_KEY } from "../api/permissionApi";

import Loader from "../../../components/ui/Loader";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import { useApiMutation } from "../../../common/hooks/useApiMutation";
import { useApiQuery } from "../../../common/hooks/useApiQuery";

export default function PermissionList({ onEdit }) {
  const { data: permissions = [], isLoading } = useApiQuery({
    key: PERMISSIONS_KEY,
    path: PERMISSIONS_ENDPOINT,
  });

  const deletePermission = useApiMutation({
    method: "remove",
    path: PERMISSIONS_ENDPOINT, //Not a function — just endpoint string
    key: PERMISSIONS_KEY,
    // onSuccess: () => toast.success("Permission deleted!"),
  });

  if (isLoading) return <Loader />;

  return (
    <div>
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
                    icon="edit"
                    variant="primary"
                    className="btn btn-sm"
                  />

                  <MiniIconButton
                    onClick={() =>
                      deletePermission.mutate({ id: permission._id })
                    }
                    icon="delete"
                    variant="danger"
                    className="btn btn-sm"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
