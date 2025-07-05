// src/components/auth/WithFeatureAccess.jsx

import UpgradePrompt from "../../components/ui/UpgradePrompt";
import useFeatureAccess from "../../hooks/useFeatureAccess";

const WithFeatureAccess = ({ feature, children }) => {
  const hasFeature = useFeatureAccess();

  if (!hasFeature(feature)) {
    return <UpgradePrompt feature={feature} />;
  }

  return children;
};

export default WithFeatureAccess;
