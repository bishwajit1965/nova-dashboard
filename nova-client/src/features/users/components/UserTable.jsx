import { LucideIcon } from "../../../lib/LucideIcons";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import Pagination from "../../../pagination/Pagination";
import UserEditModal from "./UserEditModal";
import { useState } from "react";
import { useTableData } from "../../../common/hooks/useTableData";

const UsersTable = ({ users, roles, permissions }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [paginatedData, setPaginatedData] = useState(users || []);

  const {
    searchTerm,
    setSearchTerm,
    sortKey,
    sortOrder,
    handleSort,
    tableData: sortedFilteredUsers,
  } = useTableData(users, {
    searchKeys: ["name", "email", "roles.name", "permissions.name"],
  });

  return (
    <div className="overflow-x-auto">
      {/* Search Input */}
      <div className="flex justify-end p-2">
        <input
          className="input input-sm input-bordered w-full max-w-xs"
          placeholder="Search users…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name {sortKey === "name" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("email")}>
              Email {sortKey === "email" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("roles.name")}>
              Roles{" "}
              {sortKey === "roles.name" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("permissions.name")}>
              Permissions{" "}
              {sortKey === "permissions.name" &&
                (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.map((user) => (
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

      {/* pagination begins*/}
      <Pagination
        items={sortedFilteredUsers}
        onPaginatedDataChange={setPaginatedData}
      />

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
