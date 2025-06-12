// src/features/audit-log/AuditLogPage.jsx

import AuditLogTable from "./AuditLogTable";

export default function AuditLogPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Audit Logs</h1>
      <AuditLogTable />
    </div>
  );
}
