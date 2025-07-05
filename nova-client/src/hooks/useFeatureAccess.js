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

  const features = useMemo(() => user?.plan?.features ?? [], [user]);

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

// import { useAuth } from "./useAuth";
// import { useCallback } from "react";

// const useFeatureAccess = () => {
//   const { user } = useAuth();

//   const userRoles = (user?.roles || []).map((role) =>
//     typeof role === "string" ? role : role.name
//   );

//   const isAdmin = userRoles.includes("admin");
//   const features = user?.plan?.features ?? [];

//   return useCallback(
//     (featureKey) => {
//       if (!user) return false; // deny if no user yet
//       if (isAdmin) return true; // admin always has access
//       return features.includes(featureKey); // check features otherwise
//     },
//     [user, isAdmin, features]
//   );
// };

// export default useFeatureAccess;

// import { useAuth } from "./useAuth";
// import { useCallback } from "react";

// const useFeatureAccess = () => {
//   const { user } = useAuth();

//   const alwaysDenied = () => false;

//   if (!user) return alwaysDenied;

//   const userRoles = (user.roles || []).map((role) =>
//     typeof role === "string" ? role : role.name
//   );

//   const isAdmin = userRoles.includes("admin");

//   // useCallback must be called unconditionally in the hook body
//   return useCallback(
//     (featureKey) =>
//       isAdmin || (user.plan?.features?.includes(featureKey) ?? false),
//     [isAdmin, user.plan?.features]
//   );
// };

// export default useFeatureAccess;

// import { useAuth } from "./useAuth";

// const useFeatureAccess = () => {
//   const { user } = useAuth();

//   const alwaysDenied = () => false;

//   if (!user) return alwaysDenied;

//   const userRoles = (user.roles || []).map((role) =>
//     typeof role === "string" ? role : role.name
//   );

//   const isAdmin = userRoles.includes("admin");
//   // const isEditor = userRoles.includes("editor"); // editor bypass (optional)

//   // 3. Return the real checker function
//   return (featureKey) =>
//     isAdmin || (user.plan?.features?.includes(featureKey) ?? false);
// };

// export default useFeatureAccess;
