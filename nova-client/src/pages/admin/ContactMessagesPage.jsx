import API_PATHS from "../../common/apiPaths/apiPaths";
import Button from "../../components/ui/Button";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { Loader } from "lucide-react";
import { MiniIconButton } from "../../components/ui/MiniIconButton";
import Modal from "../../components/ui/Modal";
import { QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useApiMutation } from "../../common/hooks/useApiMutation";
import { useApiQuery } from "../../common/hooks/useApiQuery";
import { useMemo } from "react";
import { useState } from "react";

const ContactMessagesPage = () => {
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [viewMessage, setViewMessage] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: contacts,
    isLoading,
    isError,
    error,
  } = useApiQuery({
    url: API_PATHS.CONTACT_MESSAGES.ENDPOINT,
    queryKey: API_PATHS.CONTACT_MESSAGES.KEY,
    // select: (res) => res.data,//NOT NEEDED HERE AS HOOK DOES IT
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  const mutation = useApiMutation({
    method: "update",
    path: (id) => `${API_PATHS.CONTACT_MESSAGES.ENDPOINT}/${id}/read`,
    key: API_PATHS.CONTACT_MESSAGES.KEY,
    onSuccess: () => {
      setTimeout(() => {
        QueryClient.invalidateQueries(API_PATHS.CONTACT_MESSAGES.KEY);
      }, 1000);
    },
    onError: (error) => {
      toast.error("Error saving user");
      console.error(error);
    },
  });

  const { mutate: deleteContactMessage } = useApiMutation({
    method: "delete",
    path: (id) => `${API_PATHS.CONTACT_MESSAGES.ENDPOINT}/${id}`,
    key: API_PATHS.CONTACT_MESSAGES.KEY,
    onSuccess: () => {
      setConfirmDelete(null);
    },
    onError: (error) => {
      toast.error("Error deleting permission");
      setConfirmDelete(null);
      console.error(error);
    },
  });

  const filteredMessages = useMemo(() => {
    if (filter === "read") return contacts.filter((m) => m.read);
    if (filter === "unread") return contacts.filter((m) => !m.read);
    return contacts;
  }, [contacts, filter]);

  const searchedMessages = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return (filteredMessages || []).filter(
      (msg) =>
        msg.name.toLowerCase().includes(term) ||
        msg.email.toLowerCase().includes(term) ||
        msg.message.toLowerCase().includes(term)
    );
  }, [filteredMessages, searchTerm]);

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  if (isError) return <p className="flex justify-center">{isError.message}</p>;
  if (error) return <p className="flex justify-center">{error.message}</p>;

  return (
    <div>
      <div className="">
        <div className="flex items-center space-x-6 mb-4">
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "default" : "outline"}
            className="btn btn-sm"
          >
            All
          </Button>
          <Button
            onClick={() => setFilter("unread")}
            variant={filter === "unread" ? "default" : "outline"}
            className="btn btn-sm"
          >
            Unread
          </Button>
          <Button
            onClick={() => setFilter("read")}
            variant={filter === "read" ? "default" : "outline"}
            className="btn btn-sm"
          >
            Read
          </Button>
          <input
            type="text"
            placeholder="Search by name, email or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full sm:w-80"
          />
        </div>
      </div>
      <h1 className="text-2xl font-semibold mb-4">Contact Messages</h1>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr className="bg-base-300">
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Status</th>
              <th>Received At</th>
              <th className="flex justify-around">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchedMessages?.map((msg) => (
              <tr key={msg._id} className="hover:bg-base-200">
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>
                  {msg.read ? (
                    <span className="text-green-600 font-semibold border p-1 w-16 flex justify-center rounded-md">
                      Read
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold border p-1 w-16 flex justify-center rounded-md">
                      Unread
                    </span>
                  )}
                </td>
                <td>{new Date(msg.createdAt).toLocaleString()}</td>
                <td className="flex justify-end space-x-2">
                  <div className="flex space-x-2">
                    <MiniIconButton
                      onClick={() => setConfirmDelete(msg)}
                      toolTip="Delete Contact"
                      variant="danger"
                      icon="delete"
                      disabled={isLoading}
                    />

                    <MiniIconButton
                      onClick={() => mutation.mutate(msg._id)}
                      icon="edit"
                      variant="success"
                      className={`btn btn-xs ${
                        msg.read
                          ? "btn-outline btn-warning"
                          : "btn-outline btn-success"
                      }`}
                    />
                    <MiniIconButton
                      onClick={() => setViewMessage(msg)}
                      toolTip="View Contact"
                      variant="primary"
                      icon="view"
                      disabled={isLoading}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Contact Message Delete Confirm Dialogue */}
        {confirmDelete && (
          <ConfirmDialog
            isOpen={confirmDelete}
            onClose={() => setConfirmDelete(null)}
            onConfirm={() => deleteContactMessage(confirmDelete._id)}
          />
        )}

        {/* View Message */}
        {viewMessage && (
          <Modal
            isOpen={viewMessage}
            onClose={() => setViewMessage(null)}
            title="View Contact Message"
            className="max-w-2xl mx-auto"
          >
            <p>
              <strong>Name:</strong> {viewMessage.name}
            </p>
            <p>
              <strong>Email:</strong> {viewMessage.email}
            </p>
            <p>
              <strong>Message:</strong> {viewMessage.message}
            </p>
            <p>
              <strong>Status:</strong> {viewMessage.read ? "Read" : "Unread"}
            </p>
            <p>
              <strong>Received At:</strong>{" "}
              {new Date(viewMessage.createdAt).toLocaleString()}
            </p>
            <div className="modal-action">
              <MiniIconButton
                className="btn bg-red-600 text-white hover:bg-red-700 w-20 h-9 rounded-md text-xl"
                onClick={() => setViewMessage(null)}
                icon="close"
                variant="view"
                label="Close"
              />
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ContactMessagesPage;
