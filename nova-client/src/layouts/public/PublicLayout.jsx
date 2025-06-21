import { Outlet, useLocation } from "react-router-dom";

import PublicFooter from "./PublicFooter";
import PublicNavbar from "./PublicNavbar";

const PublicLayout = () => {
  const location = useLocation();

  // IF PATHNAME IS LIKE: register/verify
  const hideLayout =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register");

  return (
    <div className="min-h-screen max-w-full flex flex-col">
      {hideLayout ? null : <PublicNavbar />}

      <main
        className={`${
          hideLayout
            ? "w-full mx-auto bg-white shadow-md rounded-lg"
            : "lg:max-w-7xl w-full mx-auto p-4 bg-base-50"
        } lg:min-h-[calc(100vh-330px)] md:min-h-[calc(100vh-215px)] sm:min-h-[calc(100vh-200px)] w-full`}
      >
        <Outlet />
      </main>
      {hideLayout ? null : <PublicFooter />}
    </div>
  );
};

export default PublicLayout;
