import API_PATHS from "../../../../common/apiPaths/apiPaths";
import Badge from "../../../../components/ui/Badge";
import Button from "../../../../components/ui/Button";
import ConfirmDialog from "../../../../components/ui/ConfirmDialog";
import { Loader } from "lucide-react";
import { MiniIconButton } from "../../../../components/ui/MiniIconButton";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useApiMutation } from "../../../../common/hooks/useApiMutation";
import { useApiQuery } from "../../../../common/hooks/useApiQuery";
import { useAuth } from "../../../../hooks/useAuth";
import { useState } from "react";

const TeamMembersList = () => {
  const { user } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [updatableTeamMemberId, setUpdatableTeamMemberId] = useState(null);

  console.log("USER:", user);
  const {
    data: members,
    isLoading,
    isError,
    error,
  } = useApiQuery({
    url: `${API_PATHS.TEAM_MEMBERS.ENDPOINT}/${user?.team._id}`,
    queryKey: API_PATHS.TEAM_MEMBERS.KEY,
    options: {
      enabled: !!user?.team._id,
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  // get roles to display in the team members list
  const { data: roles, isLoading: rolesLoading } = useApiQuery({
    url: API_PATHS.ROLES.ENDPOINT,
    queryKey: API_PATHS.ROLES.KEY,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  const { mutate: updateRole } = useApiMutation({
    method: "update",
    path: ({ id }) => `${API_PATHS.TEAM_MEMBERS.ENDPOINT}/${id}/role`,
    key: API_PATHS.TEAM_MEMBERS.KEY,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
    onSuccess: () => {
      setUpdatableTeamMemberId(null);
      setSelectedRoleId(null);
    },
    onError: () => {
      toast.error("Failed to update role.");
      console.error(error);
    },
  });

  const { mutate: deleteTeamMember } = useApiMutation({
    method: "delete",
    path: (id) => `${API_PATHS.TEAM_MEMBERS.ENDPOINT}/${id}`,
    key: API_PATHS.TEAM_MEMBERS.KEY,
    onSuccess: () => {
      setConfirmDelete(null);
    },
    onError: (error) => {
      toast.error("Error in deleting team member.");
      setConfirmDelete(null);
      console.error(error);
    },
  });

  const handleUpdateTeamMemberRole = () => {
    if (!selectedRoleId) {
      toast.error("Please select a team member to update.");
      return;
    }
    try {
      const res = updateRole({
        id: updatableTeamMemberId,
        data: { role: selectedRoleId },
      });
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update role.");
    }
    setUpdatableTeamMemberId(null);
    setSelectedRoleId(null);
  };

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );

  if (isError) {
    console.error(error);
    return <div>Error loading team members.</div>;
  }
  if (rolesLoading)
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="rounded-lg shadow-sm overflow-x-auto">
      <div className="">
        <h2 className="text-lg font-semibold mb-2">Team Members</h2>
        {members.length === 0 ? (
          <span>No team members found</span>
        ) : (
          <pre className="text-sm text-gray-500 mb-4">
            {members.length} team member{members.length > 1 ? "s" : ""} found.
          </pre>
        )}
      </div>

      <table className="min-w-full table table-xs">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Assigned Role</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Joined</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => {
            const isEditing = updatableTeamMemberId === member._id;
            {
              const selectedValue = isEditing ? selectedRoleId : "";
            }
            const joined = member.acceptedAt
              ? format(new Date(member.acceptedAt), "yyyy-MM-dd")
              : "—";
            const status = member.acceptedAt ? "Active" : "Pending";

            return (
              <tr key={member._id} className="border-t hover:bg-gray-50">
                <td className="">{member.name}</td>
                <td className="">{member.email}</td>
                <td className="">
                  {updatableTeamMemberId === member._id && (
                    <span className="text-xs text-green-600">
                      Team member selected: {updatableTeamMemberId}
                    </span>
                  )}

                  <div className="flex items-center space-x-2">
                    <div className="">
                      {/* <select
                        defaultValue="-- Select a Role --"
                        className="select select-xs select-primary"
                        value={selectedRoleId}
                        onChange={(e) => setSelectedRoleId(e.target.value)}
                      >
                        <option disabled={true}> -- Select a Role -- </option>
                        {roles
                          .filter((role) => role.name !== "admin")
                          .map((role) => (
                            <option key={role._id} value={role._id}>
                              {role.name}
                            </option>
                          ))}
                      </select> */}
                      {isEditing ? (
                        <select
                          defaultValue="-- Select a Role --"
                          value={selectedRoleId || ""}
                          onChange={(e) => setSelectedRoleId(e.target.value)}
                        >
                          <option value="" disabled={true}>
                            -- Select a Role --
                          </option>
                          {roles
                            .filter((role) => role.name !== "admin")
                            .map((role) => (
                              <option key={role._id} value={role._id}>
                                {role.name}
                              </option>
                            ))}
                        </select>
                      ) : (
                        member.roles.map((role) => (
                          <Badge key={role._id}>{role.name}</Badge>
                        ))
                      )}
                    </div>
                    <div className="">
                      <Button
                        className="btn btn-xs text-xs"
                        onClick={() => setUpdatableTeamMemberId(member._id)}
                      >
                        Select Member
                      </Button>
                    </div>
                  </div>
                </td>
                <td>
                  {member.roles.map((role) => (
                    <Badge key={role._id} className="mr-1 capitalize">
                      {role.name}
                    </Badge>
                  ))}
                </td>
                <td className="">
                  <Badge
                    variant={status === "Active" ? "success" : "warning"}
                    className="capitalize"
                  >
                    {status}
                  </Badge>
                </td>
                <td className="">{joined}</td>
                <td className=" space-x-2">
                  <MiniIconButton
                    variant="primary"
                    icon="edit"
                    onClick={handleUpdateTeamMemberRole}
                  >
                    Edit
                  </MiniIconButton>
                  <MiniIconButton
                    variant="danger"
                    icon="delete"
                    onClick={() => setConfirmDelete(member)}
                  >
                    Remove
                  </MiniIconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Permission Delete Confirm Dialogue */}
      {confirmDelete && (
        <ConfirmDialog
          isOpen={confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() => deleteTeamMember(confirmDelete._id)}
        />
      )}
    </div>
  );
};

export default TeamMembersList;
