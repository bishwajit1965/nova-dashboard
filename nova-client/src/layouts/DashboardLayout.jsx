import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import SectionTitle from "../utility/sectionTitle/SectionTitle";
import { ShieldCheckIcon } from "lucide-react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const leftSidebarToggler = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {!isLeftSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          toggleSidebar={toggleSidebar}
          leftSidebarToggler={leftSidebarToggler}
        />

        <main className="flex-1 overflow-y-auto bg-base-50">
          <div className="sticky top-0 z-40">
            <SectionTitle
              icon=<ShieldCheckIcon className="" />
              title="Only"
              decoratedText="Dashboard"
              userStatus={user?.name}
              activeStatus={
                isAuthenticated ? (
                  <span
                    className="tooltip tooltip-right text-sm py-1.5"
                    data-tip="Active"
                  >
                    🟢
                  </span>
                ) : (
                  <span
                    className="tooltip tooltip-right text-sm py-1.5"
                    data-tip="Inactive"
                  >
                    🔴
                  </span>
                )
              }
            />
          </div>
          <div className="lg:p-4">
            <Outlet />
          </div>
        </main>
        <div className="">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
