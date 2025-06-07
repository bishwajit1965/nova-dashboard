import React from "react";
import { Users } from "lucide-react";

const StatsCard = ({ title, value, icon = Users, color = "text-blue-500" }) => {
  return (
    <div className="bg-base-100 rounded-2xl shadow-md p-4 flex items-center gap-4">
      <div className={`p-3 rounded-full bg-info ${color}`}>
        {React.createElement(icon, { className: "w-6 h-6 text-white" })}
      </div>
      <div>
        <h4 className="text-sm text-base-content dark:text-gray-400">
          {title}
        </h4>
        <p className="text-xl font-semibold text-base-content">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
