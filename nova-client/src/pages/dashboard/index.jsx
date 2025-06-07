import TotalUsersCard from "../../features/dashboard/components/widgets/TotalUsersCard";

const Dashboard = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <TotalUsersCard />
      {/* Add more widgets here later */}
    </div>
  );
};

export default Dashboard;
