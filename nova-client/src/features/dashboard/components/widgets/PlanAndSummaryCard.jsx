import { BadgeCheck, Crown } from "lucide-react";

import Card from "../../../../components/ui/Card";
import { useAuth } from "../../../../hooks/useAuth";

// import { useAuth } from "../../hooks/useAuth";

// import { Card } from "../ui/Card";

const PlanAndSummaryCard = () => {
  const { user } = useAuth();
  const isAdmin = user?.roles?.includes("admin");
  const plan = user?.plan;

  return (
    <Card className="p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-2">Plan & Summary</h2>

      {isAdmin ? (
        <div className="text-green-700 space-y-1">
          <p className="flex items-center space-x-2 font-bold">
            <Crown size={18} />
            <span>Admin Access</span>
          </p>
          <p className="text-sm text-green-600">
            Admins have full access to all features and do not require a
            subscription plan.
          </p>
        </div>
      ) : plan ? (
        <div className="space-y-2">
          <p className="text-lg font-bold">
            {plan.name}{" "}
            <BadgeCheck className="inline ml-1 text-blue-500" size={16} />
          </p>
          <p className="text-sm text-gray-600 capitalize">Tier: {plan.tier}</p>
          <p className="text-sm font-semibold text-gray-800">
            {plan.price?.toLocaleString("en-BD", {
              style: "currency",
              currency: "BDT",
            })}{" "}
            / month
          </p>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
            {Array.isArray(plan.features) && plan.features.length > 0 ? (
              plan.features.map((feature, idx) => (
                <li key={idx}>{feature.title || feature.key}</li>
              ))
            ) : (
              <li>No features listed</li>
            )}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-red-600">
          No plan is currently assigned to this user.
        </p>
      )}
    </Card>
  );
};

export default PlanAndSummaryCard;
