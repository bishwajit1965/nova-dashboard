import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const mockActivityData = [
  { name: "Mon", users: 120 },
  { name: "Tue", users: 98 },
  { name: "Wed", users: 140 },
  { name: "Thu", users: 170 },
  { name: "Fri", users: 90 },
];

const ActivityChart = () => {
  return (
    <div className="bg-base-50 dark:bg-gray-900 rounded-2xl shadow p-4 w-full">
      <h2 className="text-lg font-semibold mb-4 text-base-content dark:text-gray-200">
        User Activity This Week
      </h2>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockActivityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;

// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const data = [
//   { day: "Mon", activity: 120 },
//   { day: "Tue", activity: 200 },
//   { day: "Wed", activity: 150 },
//   { day: "Thu", activity: 180 },
//   { day: "Fri", activity: 250 },
//   { day: "Sat", activity: 300 },
//   { day: "Sun", activity: 280 },
// ];

// const ActivityChart = () => {
//   return (
//     <div className="card bg-base-100 shadow-md p-4 mt-4">
//       <h2 className="text-lg font-semibold mb-2 text-base-content">
//         Weekly User Activity
//       </h2>
//       <div className="h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             margin={{ top: 20, right: 30, bottom: 5, left: 0 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="day" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="activity" fill="#22c55e" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default ActivityChart;
