import { useDocumentHead } from "../hooks/useDocumentHead";

const About = () => {
  useDocumentHead("About • Nova Dashboard", [
    { name: "description", content: "About Nova Dashboard and the developer" },
  ]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold mb-2">About Nova Dashboard</h1>
        <p className="text-gray-500">
          A modern role-based SaaS dashboard built with scalability and clean
          architecture in mind.
        </p>
      </div>

      {/* Project Description */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">What is this project?</h2>
        <p className="text-gray-600">
          Nova Dashboard is a full-stack application designed to demonstrate
          advanced SaaS concepts such as role-based access control, feature
          gating based on subscription plans, and modular dashboard
          architecture.
        </p>
        <p className="text-gray-600">
          It includes admin controls, user management, permissions, and dynamic
          UI rendering based on user roles and plan features.
        </p>
      </div>

      {/* Tech Stack */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Tech Stack</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Frontend: React, Tailwind CSS</li>
          <li>Backend: Node.js, Express</li>
          <li>Database: MongoDB (Mongoose)</li>
          <li>Authentication: JWT + Role-based system</li>
        </ul>
      </div>

      {/* Developer Section */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">About the Developer</h2>
        <p className="text-gray-600">
          I am a full-stack developer focused on building scalable web
          applications with clean architecture and real-world functionality.
          This project reflects my ability to design and implement complex
          systems used in modern SaaS products.
        </p>
      </div>
    </div>
  );
};

export default About;

// import { useDocumentHead } from "../hooks/useDocumentHead";

// const About = () => {
//   useDocumentHead("About Me • Nova Dashboard", [
//     { name: "description", content: "About me page" },
//   ]);

//   return <div className="">About</div>;
// };

// export default About;
