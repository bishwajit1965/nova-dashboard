import Button from "../../../components/ui/Button";
import { LucideIcon } from "../../../lib/LucideIcons";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import UserEditModal from "./UserEditModal";
import { useState } from "react";

const UsersTable = ({ users, roles, permissions }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{(user.roles?.map((role) => role.name) || []).join(", ")}</td>
              <td>
                {(
                  user.permissions?.map((permission) => permission.name) || []
                ).join(", ")}
              </td>
              <td>
                <MiniIconButton
                  variant="primary"
                  className="btn"
                  tooltip="Edit Roles/Permissions"
                  icon={LucideIcon.Edit}
                  onClick={() => setSelectedUser(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg">
            <UserEditModal
              user={selectedUser}
              roles={roles}
              permissions={permissions}
              closeModal={() => setSelectedUser(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default UsersTable;
