import { useState } from "react";
import { useDocumentHead } from "../hooks/useDocumentHead";

const Contact = () => {
  useDocumentHead("Contact • Nova Dashboard", [
    { name: "description", content: "Contact page for Nova Dashboard" },
  ]);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Contact</h1>
        <p className="text-gray-500">
          Have a question or want to connect? Send a message below.
        </p>
      </div>

      {/* Form */}
      {submitted ? (
        <div className="p-4 bg-green-100 text-green-700 rounded">
          Message sent successfully! (Demo)
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded bg-base-100"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border rounded bg-base-100"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea
              required
              rows="4"
              className="w-full px-3 py-2 border rounded bg-base-100"
              placeholder="Write your message..."
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2 bg-primary text-white rounded hover:opacity-90"
          >
            Send Message
          </button>
        </form>
      )}

      {/* Extra Info */}
      <div className="text-sm text-gray-500">
        Or email directly at: support@novadashboard.dev
      </div>
    </div>
  );
};

export default Contact;

// import { useDocumentHead } from "../hooks/useDocumentHead";

// const Contact = () => {
//   useDocumentHead("Contact Me • Nova Dashboard", [
//     { name: "description", content: "Contact me page" },
//   ]);
//   return <div className="">Contact</div>;
// };

// export default Contact;
