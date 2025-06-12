import { useEffect, useMemo, useState } from "react";

import API_PATHS from "../../common/apiPaths/apiPaths";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import { Input } from "../ui/Input";
import Loader from "../ui/Loader";
import { LucideIcon } from "../../lib/LucideIcons";
import { MiniIconButton } from "../ui/MiniIconButton";
import Modal from "../ui/Modal";
import Textarea from "../ui/Textarea";
import UserViewModal from "../ui/UserViewModal";
import toast from "react-hot-toast";
import { useApiMutation } from "../../common/hooks/useApiMutation";
import useValidator from "../../hooks/useValidator";

const UsersTable = ({ users, onSuccess, onClose }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Form state for editing
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const validationRules = {
    name: {
      required: { message: "Name is required" },
    },
    email: {
      required: { message: "Email is required" },
      pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" },
    },
    bio: {
      required: { message: "Bio is required" }, // <-- Add this line
      custom: (val) =>
        val && val.length > 500 ? "Bio must be less than 500 characters" : null,
    },
  };
  const { errors, validate } = useValidator(validationRules, formData);

  // When a user is selected for editing, populate form
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        bio: selectedUser.bio || "",
      });
    }
  }, [selectedUser]);

  const mutation = useApiMutation({
    method: "update",
    path: (data) => `${API_PATHS.USERS.ENDPOINT}/${data.id}`,
    key: API_PATHS.USERS.KEY,
    onSuccess: (data) => {
      onSuccess?.(data);
      setTimeout(() => {
        onClose?.();
        setIsEditModalOpen(false);
      }, 1000);
    },
    onError: (error) => {
      toast.error("Error saving user");
      console.error(error);
    },
  });

  const { mutate: deleteUserById } = useApiMutation({
    method: "delete",
    path: (id) => `${API_PATHS.USERS.ENDPOINT}/${id}`,
    key: API_PATHS.USERS.KEY,
    onSuccess: () => {
      setTimeout(() => {
        onSuccess?.();
        onClose?.();
        setIsEditModalOpen(false);
      }, 1000);
      setConfirmDelete(null);
    },
    onError: (error) => {
      toast.error("Error deleting permission");
      setConfirmDelete(null);
      console.error(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = selectedUser
      ? { id: selectedUser._id, data: { ...formData } }
      : { data: { ...formData } };

    mutation.mutate(payload);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add this state for filtering and sorting
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  // Filtered & sorted users
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const sortedUsers = useMemo(() => {
    const sorted = [...filteredUsers];
    sorted.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredUsers, sortConfig]);

  // Sorting handler
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-2 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="input input-bordered input-sm w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="table table-zebra table-xs w-full">
        <thead>
          <tr>
            <th
              onClick={() => requestSort("name")}
              className="cursor-pointer select-none"
            >
              Name{" "}
              {sortConfig.key === "name"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              onClick={() => requestSort("email")}
              className="cursor-pointer select-none"
            >
              Email{" "}
              {sortConfig.key === "email"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th>Roles</th>
            <th>Permissions</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sortedUsers?.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.roles?.map((role) => role.name).join(", ")}</td>
              <td>
                {user.permissions
                  ?.map((permission) => permission.name)
                  .join(", ")}
              </td>
              <td className="flex justify-end space-x-2">
                <MiniIconButton
                  type="submit"
                  variant="primary"
                  icon="edit"
                  size=""
                  tooltip="Edit User"
                  onClick={() => openEditModal(user)}
                  className=" "
                />
                <MiniIconButton
                  type="submit"
                  variant="danger"
                  icon="delete"
                  size=""
                  tooltip="Delete User"
                  onClick={() => setConfirmDelete(user)}
                />
                <MiniIconButton
                  type="button"
                  variant="success"
                  icon="view"
                  size=""
                  tooltip={"View User"}
                  onClick={() => handleViewUser(user)}
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
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered input-sm w-full"
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered input-sm w-full"
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Bio</label>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                // className={`w-full input-bordered ${
                //   formData.bio.length > 480 ? "border-red-500" : ""
                // }`}
                className={`w-full input-bordered ${
                  errors.bio || formData.bio.length > 480
                    ? "border-red-500 animate-pulse"
                    : ""
                }`}
                maxLength={500}
              />
              {errors.bio && (
                <p className="text-red-600 text-xs mt-1">{errors.bio}</p>
              )}
              <div className="text-xs text-right mt-1">
                {formData.bio.length}/500{" "}
                {formData.bio.length > 480 && (
                  <span className="text-warning font-medium">
                    Approaching limit
                  </span>
                )}
              </div>
            </div>
            <div className="text-right pt-2 space-x-4">
              {console.log("mutation.isLoading", mutation.isPending)}
              <Button
                type="submit"
                variant="primary"
                icon={LucideIcon.Edit}
                disabled={mutation.isPending}
                loading={mutation.isLoading}
                className="btn btn-sm"
              >
                {mutation.isPending ? <Loader /> : "Update"}
              </Button>

              <Button
                onClick={closeEditModal}
                type="button"
                variant="warning"
                icon={LucideIcon.X}
                className="btn btn-sm"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      )}
      {/* JSX */}
      {viewModalOpen && (
        <UserViewModal
          user={selectedUser}
          open={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
        />
      )}

      {/* Role Delete Confirm Dialogue */}
      {confirmDelete && (
        <ConfirmDialog
          isOpen={confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() => deleteUserById(confirmDelete._id)}
        />
      )}
    </div>
  );
};

export default UsersTable;
