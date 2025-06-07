import { MiniIconButton } from "../ui/MiniIconButton";
import Modal from "../ui/Modal";
import UserViewModal from "../ui/UserViewModal";
import { useState } from "react";

const UsersTable = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const handleView = (user) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  // Update user (PUT)
  // const editUser = useEntityMutation({
  //   path: "/users",
  //   method: "put",
  //   successMessage: "User updated",
  //   errorMessage: "Update failed",
  //   invalidate: "users",
  // });

  // Delete user
  // const deleteUser = useEntityMutation({
  //   path: "/users",
  //   method: "delete",
  //   successMessage: "User deleted",
  //   invalidate: "users",
  // });

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    alert("Delete Clicked");
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Permissions</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.roles?.join(", ")}</td>
              <td>{user.permissions?.join(", ")}</td>
              <td className="flex justify-end space-x-2">
                <MiniIconButton
                  variant="primary"
                  icon="edit"
                  size="sm"
                  tooltip="Edit User"
                  onClick={() => openEditModal(user)}
                  className=" "
                />
                <MiniIconButton
                  variant="danger"
                  icon="delete"
                  size="sm"
                  tooltip="Delete User"
                  onClick={() => handleDeleteClick(user)}
                />
                <MiniIconButton
                  variant="success"
                  icon="view"
                  size="sm"
                  tooltip={"View User"}
                  onClick={() => handleView(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          title={`Edit ${selectedUser?.name}`}
        >
          {/* Your form fields go here */}
          <h2>{selectedUser.name}</h2>
          <p>Edit form for: {selectedUser?.email}</p>
        </Modal>
      )}
      {/* JSX */}
      <UserViewModal
        user={selectedUser}
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
      />
    </div>
  );
};

export default UsersTable;
