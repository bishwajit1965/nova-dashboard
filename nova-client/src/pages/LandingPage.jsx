import Button from "../components/ui/Button";
import { CircleArrowOutUpRight } from "lucide-react";

const LandingPage = () => {
  return (
    <main className="px- py-12 max-w-7xl mx-auto text-center space-y-16">
      {/* Hero Section */}
      <section>
        <h1 className="text-4xl text-base-content font-bold">
          Welcome to Nova Dashboard
        </h1>
        <p className="mt-4 text-lg text-base-content">
          Your unified admin solution for managing content, users, and data.
        </p>

        <Button
          variant="cyan"
          className="mt-4 btn btn-lg"
          icon={CircleArrowOutUpRight}
        >
          Get Started
        </Button>
      </section>

      {/* Pricing Cards */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-xl shadow-sm border border-base-300 bg-base-100 text-base-content transition-colors"
          >
            <h3 className="text-xl font-semibold">Plan {i + 1}</h3>
            <p className="my-4 text-base font-medium text-secondary">
              $ {29 + i * 20}/mo
            </p>
            <ul className="text-left space-y-2">
              <li>✓ Feature 1</li>
              <li>✓ Feature 2</li>
              <li>✓ Feature 3</li>
            </ul>
            <button className="mt-4 w-full btn btn-primary">Choose Plan</button>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-base-content">
          What Our Users Say
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {["Alice", "Bob", "Charlie"].map((name) => (
            <div
              key={name}
              className="p-6 rounded-xl shadow bg-base-300 text-base-content border border-base-200 transition-colors"
            >
              <p>“Nova has changed how we manage our operations!”</p>
              <p className="mt-2 font-semibold text-secondary">— {name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-base-200 p-8 rounded-xl shadow-sm text-base-content">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <form className="space-y-4 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 rounded input input-bordered bg-base-100 text-base-content"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 rounded input input-bordered bg-base-100 text-base-content"
          />
          <textarea
            rows={4}
            placeholder="Your Message"
            className="w-full p-2 rounded textarea textarea-bordered bg-base-100 text-base-content"
          />

          <button className="btn btn-primary w-full">Send Message</button>
        </form>
      </section>
    </main>
  );
};

export default LandingPage;
