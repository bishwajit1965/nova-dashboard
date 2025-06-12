import API_PATHS from "../../common/apiPaths/apiPaths";
import { Loader } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useApiQuery } from "../../common/hooks/useApiQuery";

const AuditLogTable = () => {
  const {
    data: logs,
    isLoading,
    isError,
    error,
  } = useApiQuery({
    url: API_PATHS.AUDIT_LOGS.ENDPOINT,
    queryKey: API_PATHS.AUDIT_LOGS.KEY,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });
  console.log("Audit logs", logs);
  if (error)
    return <div className="flex justify-center">Error: {error.message}</div>;

  return (
    <div className="overflow-x-auto rounded border border-gray-200 dark:border-gray-700">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <tr>
            <th className="p-2">User</th>
            <th className="p-2">Action</th>
            <th className="p-2">Time</th>
            <th className="p-2">Log Details</th>
          </tr>
        </thead>
        <tbody className="divide-y dark:divide-gray-700">
          {isLoading ? (
            <div className="flex justify-center animate-spin">
              <Loader />
            </div>
          ) : isError ? (
            <p className="text-red-500 flex justify-center">
              Failed to load audit logs.
            </p>
          ) : (
            logs?.map((log) => (
              <tr key={log._id}>
                <td>{log.userId?.name}</td>
                <td>{log.action}</td>
                <td>
                  {formatDistanceToNow(new Date(log.timestamp), {
                    addSuffix: true,
                  })}
                </td>
                <td>{log.details}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default AuditLogTable;
