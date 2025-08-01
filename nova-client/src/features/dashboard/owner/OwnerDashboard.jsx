import { useAuth } from "../../../hooks/useAuth";

const OwnerDashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      <p className="text-2xl font-bold mb-4">
        {user.email
          ? `Welcome, ${user.email}`
          : "Welcome to the Owner Dashboard"}
      </p>
    </div>
  );
};

export default OwnerDashboard;
