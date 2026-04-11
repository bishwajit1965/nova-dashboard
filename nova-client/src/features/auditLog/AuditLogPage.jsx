import AuditLogTable from "./AuditLogTable";
import WithFeatureAccess from "../auth/WithFeatureAccess";
import { LucideIcon } from "../../lib/LucideIcons";

const AuditLogPage = () => {
  return (
    <WithFeatureAccess feature="audit-logs">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          {" "}
          <LucideIcon.FilePenLine /> Audit Logs
        </h1>
        <AuditLogTable />
      </div>
    </WithFeatureAccess>
  );
};
export default AuditLogPage;
