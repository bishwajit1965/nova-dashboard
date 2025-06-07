import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import Badge from "./Badge";
import { format } from "date-fns";

export default function UserViewModal({ user, open, onClose }) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <div>
            <strong>Name:</strong> <span>{user.name}</span>
          </div>
          <div>
            <strong>Email:</strong> <span>{user.email}</span>
          </div>
          {user.bio && (
            <div>
              <strong>Bio:</strong> <span>{user.bio}</span>
            </div>
          )}
          <div>
            <strong>Roles:</strong>{" "}
            <div className="flex flex-wrap gap-1 mt-1">
              {user.roles?.map((role) => (
                <Badge key={role} color="blue">
                  <span>{role}</span>
                </Badge>
              ))}
            </div>
          </div>
          {user.permissions?.length > 0 && (
            <div>
              <strong>Permissions:</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {user.permissions.map((perm) => (
                  <Badge key={perm} color="blue">
                    {perm}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <div>
            <strong>Created: </strong>
            <span>{format(new Date(user.createdAt), "PPpp")}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
