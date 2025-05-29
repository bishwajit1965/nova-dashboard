import React from "react";
import { Users } from "lucide-react";

const StatsCard = ({ title, value, icon = Users, color = "text-blue-500" }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4 flex items-center gap-4">
      <div className={`p-3 rounded-full bg-blue-100 dark:bg-blue-900 ${color}`}>
        {React.createElement(icon, { className: "w-6 h-6" })}
      </div>
      <div>
        <h4 className="text-sm text-gray-500 dark:text-gray-400">{title}</h4>
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
