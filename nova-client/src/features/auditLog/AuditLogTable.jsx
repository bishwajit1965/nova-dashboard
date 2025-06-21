import API_PATHS from "../../common/apiPaths/apiPaths";
import { Loader } from "lucide-react";
import Pagination from "../../pagination/Pagination";
import { formatDistanceToNow } from "date-fns";
import { useApiQuery } from "../../common/hooks/useApiQuery";
import { useState } from "react";
import { useTableData } from "../../common/hooks/useTableData";

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

  // Step 1: Run sorting & filtering on the full data [Filtering and sorting]
  const {
    searchTerm,
    setSearchTerm,
    sortKey,
    sortOrder,
    handleSort,
    tableData,
  } = useTableData(logs, {
    searchKeys: ["userId.name", "action", "timestamp", "details"],
    formatters: {
      timestamp: (val) =>
        formatDistanceToNow(new Date(val), { addSuffix: true }),
    },
  });

  // Step 2: Run pagination AFTER sorting/filtering
  const [paginatedData, setPaginatedData] = useState([]);

  if (error)
    return <div className="flex justify-center">Error: {error.message}</div>;

  return (
    <div className="">
      {isLoading ? (
        <div className="flex mx-auto justify-center animate-spin">
          <Loader />
        </div>
      ) : isError ? (
        <p className="text-red-500 flex justify-center">
          Failed to load audit logs.
        </p>
      ) : (
        ""
      )}
      <div className="overflow-x-auto">
        <div className="mb-2 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search logs..."
            className="input input-bordered input-sm w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead className="bg-base-300 dark:bg-gray-800">
              <tr>
                {["userId.name", "action", "timestamp", "details"].map(
                  (key) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      className="cursor-pointer p-2 capitalize"
                    >
                      {key.split(".").pop()}{" "}
                      {sortKey === key && (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y dark:divide-gray-700">
              {paginatedData?.map((log) => (
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Step 3: Apply pagination on filtered+sorted data */}
        {/* pagination begins*/}
        <div className="lg:my-8">
          <Pagination
            items={tableData}
            onPaginatedDataChange={setPaginatedData}
          />
        </div>
      </div>
    </div>
  );
};
export default AuditLogTable;
