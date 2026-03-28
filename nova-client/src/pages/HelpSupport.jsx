import { useDocumentHead } from "../hooks/useDocumentHead";

const HelpSupport = () => {
  useDocumentHead("Help & Support • Nova Dashboard", [
    { name: "description", content: "Help and support page" },
  ]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
        <p className="text-gray-500">
          Find answers to common questions and learn how to use the dashboard.
        </p>
      </div>

      {/* Getting Started */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Getting Started</h2>
        <p className="text-gray-600">
          After logging in, you will be redirected to your dashboard based on
          your role. Navigation options and features will vary depending on your
          permissions and plan.
        </p>
      </div>

      {/* Features */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Features & Access</h2>
        <p className="text-gray-600">
          Some features are restricted based on your subscription plan. If you
          do not see a feature, it may not be included in your current plan.
        </p>
      </div>

      {/* FAQ */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Why can’t I access some features?</li>
          <li>How do roles and permissions work?</li>
          <li>How can I upgrade my plan?</li>
        </ul>
      </div>

      {/* Contact */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Need More Help?</h2>
        <p className="text-gray-600">
          If you need further assistance, feel free to reach out via the contact
          page or email support@novadashboard.dev.
        </p>
      </div>
    </div>
  );
};

export default HelpSupport;
