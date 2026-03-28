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

const PlanSignUpsOverviewCard = () => {
  const [planData, setPlanData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanStats = async () => {
      try {
        const res = await api.get("/admin/plan-signups");
        setPlanData(res.data); // Expected: [{ name, value }]
      } catch (error) {
        console.error("Failed to fetch plan signup data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanStats();
  }, []);

  if (loading) return <Card className="p-4">Loading plan data...</Card>;

  if (!planData || planData.length === 0) {
    return (
      <Card className="p-4">
        <p>No signup data available for plans.</p>
      </Card>
    );
  }

  return (
    <Card className="p-4 space-y-2 shadow-md">
      <h2 className="text-xl font-semibold">Plan Signups Overview</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={planData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {planData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PlanSignUpsOverviewCard;
