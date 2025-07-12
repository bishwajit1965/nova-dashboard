import { useCallback, useMemo } from "react";

import { useAuth } from "./useAuth";

const useFeatureAccess = () => {
  const { user } = useAuth();

  const userRoles = useMemo(
    () =>
      (user?.roles || []).map((role) =>
        typeof role === "string" ? role : role.name
      ),
    [user]
  );
  const isAdmin = userRoles.includes("admin");

  const features = useMemo(() => {
    const raw = user?.plan?.features ?? [];
    return raw.map((f) => (typeof f === "string" ? f : f.key));

    // user?.plan?.features ?? [];
  }, [user]);

  console.log("🔍 Available features:", features);
  // console.log("🔐 Feature required:", featureKey);
  return useCallback(
    (featureKey) => {
      if (!user) return false;
      if (isAdmin) return true;
      return features.includes(featureKey);
    },
    [user, isAdmin, features]
  );
};

export default useFeatureAccess;
