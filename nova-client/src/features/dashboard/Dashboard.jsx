import { Activity, DollarSign, Users } from "lucide-react";

import RevenueCard from "@/components/widgets/RevenueCard";
import StatsCard from "@/components/widgets/StatsCard";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 p-4">
      <StatsCard
        title="Total Users"
        value="1,024"
        icon={Users}
        color="text-blue-500"
      />
      <StatsCard
        title="Active Sessions"
        value="312"
        icon={Activity}
        color="text-green-500"
      />
      <RevenueCard title="Monthly Revenue" amount="$8,420" percentage={12.3} />
      <RevenueCard
        title="Conversion Rate"
        amount="3.4%"
        percentage={-1.2}
        positive={false}
      />
    </div>
  );
};

export default Dashboard;
