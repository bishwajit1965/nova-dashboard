// LandingPage.jsx
const LandingPage = () => {
  return (
    <main className="px- py-12 max-w-6xl mx-auto text-center space-y-16">
      {/* Hero Section */}
      <section>
        <h1 className="text-4xl font-bold">Welcome to Nova Dashboard</h1>
        <p className="mt-4 text-lg text-gray-600">
          Your unified admin solution for managing content, users, and data.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl">
          Get Started
        </button>
      </section>

      {/* Pricing Cards */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-6 border rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">Plan {i + 1}</h3>
            <p className="my-4 text-gray-500">$ {29 + i * 20}/mo</p>
            <ul className="text-left space-y-2">
              <li>✓ Feature 1</li>
              <li>✓ Feature 2</li>
              <li>✓ Feature 3</li>
            </ul>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
              Choose Plan
            </button>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section>
        <h2 className="text-2xl font-bold mb-4">What Our Users Say</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {["Alice", "Bob", "Charlie"].map((name) => (
            <div key={name} className="bg-gray-100 p-6 rounded-xl shadow">
              <p>“Nova has changed how we manage our operations!”</p>
              <p className="mt-2 font-semibold">— {name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-gray-50 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <form className="space-y-4 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border p-2 rounded"
          />
          <textarea
            rows={4}
            placeholder="Your Message"
            className="w-full border p-2 rounded"
          />
          <button className="bg-blue-600 text-white py-2 px-6 rounded">
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
};

export default LandingPage;
