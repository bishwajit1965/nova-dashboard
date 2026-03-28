import { useEffect, useState } from "react";

import Card from "../../../../components/ui/Card";
import { Clock } from "lucide-react";
import api from "../../../../lib/api";

const RecentPlanChangesCard = () => {
  const [changes, setChanges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        const res = await api.get("/admin/recent-plan-changes");
        setChanges(res.data);
      } catch (error) {
        console.error("Error fetching recent plan changes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChanges();
  }, []);

  if (loading)
    return <Card className="lg:p-4">Loading recent plan changes...</Card>;

  return (
    <Card className="p-4 space-y-2 shadow-md">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Clock size={20} /> Recent Plan Changes
      </h2>
      <ul className="space-y-2">
        {changes.length > 0 ? (
          changes.map((entry, idx) => (
            <li key={idx} className="border p-2 rounded-lg bg-base-200">
              <p className="font-medium">
                {entry.userName} {entry.action}{" "}
                <span className="font-semibold">{entry.planName}</span>
              </p>
              <p className="text-sm text-gray-500">
                {new Date(entry.timestamp).toLocaleString()}
              </p>
            </li>
          ))
        ) : (
          <p className="text-sm text-muted">No recent changes found.</p>
        )}
      </ul>
    </Card>
  );
};

export default RecentPlanChangesCard;
