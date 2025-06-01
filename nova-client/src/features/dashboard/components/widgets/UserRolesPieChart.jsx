import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const pieData = [
  { name: "Admins", value: 4 },
  { name: "Editors", value: 8 },
  { name: "Users", value: 24 },
];

const COLORS = ["#4f46e5", "#22c55e", "#f97316"];

const UserRolesPieChart = () => {
  return (
    <div className="bg-base-50 dark:bg-gray-900 rounded-2xl shadow p-4 w-full">
      <h2 className="text-lg text-base-content font-semibold mb-4 dark:text-gray-200">
        User Role Distribution
      </h2>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserRolesPieChart;
