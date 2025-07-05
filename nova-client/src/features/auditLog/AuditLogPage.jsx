// src/features/audit-log/AuditLogPage.jsx

import AuditLogTable from "./AuditLogTable";
import WithFeatureAccess from "../auth/WithFeatureAccess";

const AuditLogPage = () => {
  return (
    <WithFeatureAccess feature="view-audit-log">
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">Audit Logs</h1>
        <AuditLogTable />
      </div>
    </WithFeatureAccess>
  );
};
export default AuditLogPage;
