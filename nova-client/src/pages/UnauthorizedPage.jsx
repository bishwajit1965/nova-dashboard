import Button from "../components/ui/Button";
import { House } from "lucide-react";

const UnauthorizedPage = () => {
  return (
    <div className="text-center lg:min-h-[calc(100vh-180px)] min-h-[calc(100vh-150px)]  flex items-center justify-center">
      <div className="space-y-2">
        <div className="">
          <h1 className="text-3xl font-bold text-red-600">
            403 - Unauthorized !
          </h1>
        </div>
        <div className="">
          <p className="mt-4 text-lg text-gray-600">
            You do not have permission to view this page.
          </p>
        </div>
        <div className="pt-3">
          <Button
            variant="cyan"
            href="/"
            className="hover:text-base-200 btn btn-md shadow-md"
          >
            <House size={18} /> Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
