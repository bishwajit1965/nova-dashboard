import { useAuth } from "./useAuth";
import useFeatureAccess from "./useFeatureAccess";

export const useNavAccess = () => {
  const { user } = useAuth();
  const hasFeature = useFeatureAccess();

  if (!user) return () => false;

  const userRoles = (user.roles || []).map((role) =>
    typeof role === "string" ? role : role.name
  );

  const userPermissions = user?.permissions || [];

  const isAdmin = userRoles.includes("admin");

  return (item) => {
    // 1️⃣ Role gate
    const rolePass =
      isAdmin ||
      item.roles.length === 0 ||
      item.roles.some((role) => userRoles.includes(role));
    if (!rolePass) return false;

    /* 2️⃣ Permission */
    const permissionPass =
      isAdmin ||
      !item.permissions ||
      item.permissions.length === 0 ||
      item.permissions.every((permission) =>
        userPermissions.includes(permission)
      );

    if (!permissionPass) return false;

    /* 3️⃣ Plan Feature */
    // const featurePass = !item.feature || isAdmin || hasFeature(item.feature);
    const featurePass = isAdmin || !item.feature || hasFeature(item.feature);

    return featurePass;
  };
};

// export const useNavAccess = () => {
//   const { user } = useAuth();
//   const hasFeature = useFeatureAccess();

//   if (!user) return () => false;

//   const userRoles = (user.roles || []).map((role) =>
//     typeof role === "string" ? role : role.name
//   );
//   const userPermissions = (user.permissions || []).map((p) =>
//     typeof p === "string" ? p : p.name
//   );
//   const features = user?.plan?.features || [];

//   const isAdmin = userRoles.includes("admin");

//   return (item) => {
//     const rolePass =
//       isAdmin ||
//       item.roles?.length === 0 ||
//       item.roles?.some((role) => userRoles.includes(role));

//     const permissionPass =
//       isAdmin ||
//       item.permissions?.length === 0 ||
//       item.permissions?.every((p) => userPermissions.includes(p));

//     const featurePass =
//       isAdmin || !item.feature || features.includes(item.feature);

//     return rolePass && permissionPass && featurePass;
//   };
// };
