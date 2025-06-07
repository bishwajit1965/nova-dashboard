import { Users } from "lucide-react";

const LiveUsersCard = () => {
  return (
    <div className="bg-base-100 p-4 rounded-2xl shadow-md flex items-center gap-4">
      <div className="bg-info p-3 rounded-full">
        <Users className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500">Live Users</p>
        <h3 className="text-2xl font-semibold text-base-content">27</h3>
      </div>
    </div>
  );
};

export default LiveUsersCard;
