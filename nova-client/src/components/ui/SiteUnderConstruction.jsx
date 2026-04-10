import { Construction, ArrowLeft, RefreshCw, Home } from "lucide-react";
import Button from "./Button";
// import Button from "../components/ui/Button";

const SiteUnderConstruction = () => {
  return (
    <div className="min-h-[calc(100vh-210px)] flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200 px-4">
      <div className="text-center max-w-xl w-full space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-yellow-100 text-yellow-600 shadow-md">
            <Construction className="w-10 h-10" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold">Site Under Construction 🚧</h1>

        {/* Description */}
        <p className="text-gray-500 text-sm md:text-base">
          We're working hard to bring this feature to life. Please check back
          soon or explore other parts of the app.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button
            variant="primary"
            icon={Home}
            onClick={() => (window.location.href = "/")}
          >
            Go Home
          </Button>

          <Button
            variant="outline"
            icon={ArrowLeft}
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>

          <Button
            variant="success"
            icon={RefreshCw}
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-400 pt-4">
          Thanks for your patience 🙏
        </p>
      </div>
    </div>
  );
};

export default SiteUnderConstruction;
