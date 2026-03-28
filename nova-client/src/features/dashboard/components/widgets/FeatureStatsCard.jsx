import { Layers3, Sparkles } from "lucide-react";

import Card from "../../../../components/ui/Card";
import PlanContext from "../../../../planContext/PlanContext";
import { useContext } from "react";

// import { Card } from "../ui/Card";

// import PlanContext from "../../planContext/PlanContext";

const FeatureStatsCard = () => {
  const { plans, isLoading, isError } = useContext(PlanContext);

  if (isLoading) return <Card className="p-4">Loading feature stats...</Card>;
  if (isError || !plans)
    return (
      <Card className="p-4 text-red-500">Failed to load feature stats.</Card>
    );

  const allFeatures = new Set();
  plans.forEach((plan) => {
    plan.features?.forEach((f) => allFeatures.add(f._id));
  });

  return (
    <Card className="p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-2">Feature Stats</h2>
      <div className="text-sm space-y-1">
        <p className="flex items-center space-x-2">
          <Sparkles size={16} className="text-purple-600" />
          <span>Total Unique Features:</span>
          <strong>{allFeatures.size}</strong>
        </p>
        <p className="flex items-center space-x-2">
          <Layers3 size={16} className="text-indigo-600" />
          <span>Plans with Features:</span>
          <strong>{plans.filter((p) => p.features?.length).length}</strong>
        </p>
      </div>
    </Card>
  );
};

export default FeatureStatsCard;
