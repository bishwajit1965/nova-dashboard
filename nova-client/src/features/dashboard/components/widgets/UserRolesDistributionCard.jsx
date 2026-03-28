import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";

import Card from "../../../../components/ui/Card";
import api from "../../../../lib/api";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const UserRolesDistributionCard = () => {
  const [roleData, setRoleData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("Roles data", roleData);
  useEffect(() => {
    const fetchRoleStats = async () => {
      try {
        const res = await api.get("/admin/role-distribution");
        setRoleData(res.data); // Expected format: [{ name: "admin", value: 3 }, ...]
      } catch (error) {
        console.error("Failed to fetch role distribution:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoleStats();
  }, []);

  if (loading) return <Card className="p-4">Loading role distribution...</Card>;

  return (
    <Card className="p-4 space-y-2 shadow-md">
      <h2 className="text-xl font-semibold">User Role Distribution</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={roleData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          >
            {roleData.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default UserRolesDistributionCard;
