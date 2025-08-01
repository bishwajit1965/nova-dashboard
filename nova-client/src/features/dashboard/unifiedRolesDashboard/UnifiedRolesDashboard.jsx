import EditorWidgets from "../../../components/widgets/EditorWidgets";
import UserWidgets from "../../../components/widgets/UserWidgets";
import WriterWidgets from "../../../components/widgets/WriterWidgets";
import { useAuth } from "../../../hooks/useAuth";

const UnifiedRolesDashboard = () => {
  const { user } = useAuth();
  const roleNames = user.roles.map((r) => (typeof r === "string" ? r : r.name));
  return (
    <div className="">
      {/* <h1 className="text-2xl font-bold flex justify-center">
        Welcome, {user?.name}
      </h1> */}
      {roleNames.includes("editor") && <EditorWidgets />}
      {roleNames.includes("user") && <UserWidgets />}
      {roleNames.includes("writer") && <WriterWidgets />}
    </div>
  );
};

export default UnifiedRolesDashboard;
