import { useEffect } from "react";

const AssignRolesPermissions = ({
  roles,
  permissions,
  onChange,
  toggleRole,
  togglePermission,
  selectedRoles,
  selectedPermissions,
}) => {
  useEffect(() => {
    onChange({
      roles: selectedRoles,
      permissions: selectedPermissions,
    });
  }, [selectedRoles, selectedPermissions, onChange]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-1">Roles</h3>
        <div className="grid grid-cols-2 gap-2">
          {roles?.map((role) => (
            <label key={role._id} className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={selectedRoles.includes(role._id)}
                onChange={() => toggleRole(role._id)}
              />
              {role.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-1">Permissions</h3>
        <div className="grid grid-cols-2 gap-2">
          {permissions?.map((perm) => (
            <label key={perm._id} className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={selectedPermissions.includes(perm._id)}
                onChange={() => togglePermission(perm._id)}
              />
              {perm.name}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignRolesPermissions;
