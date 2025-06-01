import Button from "../components/ui/Button";
import { House } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center lg:min-h-[calc(100vh-180px)] min-h-[calc(100vh-150px)] text-center p-6">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Button href="/" variant="cyan" className="shadow-lg">
        <House /> Go Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
