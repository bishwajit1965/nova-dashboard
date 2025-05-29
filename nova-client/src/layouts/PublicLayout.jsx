import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
