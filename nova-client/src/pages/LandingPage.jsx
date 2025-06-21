import { BarChart2, History, Loader, ShieldCheck } from "lucide-react";
import {
  CircleArrowOutUpRight,
  DollarSign,
  LayoutDashboard,
  Lock,
} from "lucide-react";

import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Link } from "react-router-dom";
import StarRating from "../components/ui/StartRating";
import api from "../lib/api";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const features = [
  { title: "Role-based Access", icon: ShieldCheck },
  { title: "Audit Logs", icon: History },
  { title: "Analytics Dashboard", icon: BarChart2 },
];

const plans = [
  { name: "Starter", price: 29 },
  { name: "Pro", price: 49 },
  { name: "Enterprise", price: 99 },
];

const testimonials = [
  {
    name: "Alice",
    quote: "Nova has changed how we manage our operations!",
    rating: 5,
  },
  {
    name: "Bob",
    quote: "Intuitive and powerful dashboard with everything I need.",
    rating: 4,
  },
  {
    name: "Charlie",
    quote: "Support team is super helpful and quick to respond.",
    rating: 5,
  },
];

const LandingPage = () => {
  const { user } = useAuth();
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateContactForm = () => {
    const newErrors = {};
    const { name, email, message } = formData;
    if (!name.trim()) newErrors.contactName = "Name is required";
    if (!email.trim()) {
      newErrors.contactEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.contactEmail = "Email is invalid";
    }
    if (!message.trim()) newErrors.contactMessage = "Message is required";
    setErrors(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateContactForm()) return;
    setSubmitStatus("success");
    setSending(true);
    try {
      await api.post("/contact", formData);
      toast.success("📨 Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setSubmitStatus("success");
      setErrors({});
    } catch (error) {
      console.error("Send failed:", error);
      toast.error("❌ Failed to send message. Try again.");
    } finally {
      setTimeout(() => {
        setLoading(false); // ⬅️ Loader stops after 2 seconds
        setErrors({});
        setSubmitStatus(null);
        setFormData({ name: "", email: "", message: "" });
        setSending(false);
      }, 2000);
    }
  };
  // Simulate loading state for demo purposes
  setTimeout(() => {
    setLoading(false);
    setSubmitStatus(null);
    setErrors(false);
  }, 2000);

  return (
    <div>
      <main className="py-12 max-w-7xl mx-auto text-center space-y-20">
        {/* Hero Section */}
        <section className="space-y-6">
          <h1 className="text-5xl font-extrabold text-base-content">
            Welcome to Nova Dashboard
          </h1>
          {user?.name}
          <p className="text-lg text-secondary">
            Manage your content, users, and data effortlessly with our
            all-in-one admin platform.
          </p>
          <Link to="/register">
            <Button
              variant="cyan"
              className="btn-lg"
              icon={CircleArrowOutUpRight}
            >
              Get Started Free
            </Button>
          </Link>
        </section>

        {/* Features Section */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features?.map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-xl shadow border border-base-300 bg-base-100 text-base-content"
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <feature.icon />
                {feature.title}
              </h3>
              <p className="text-sm text-secondary">
                Powerful tools to help you manage and scale your platform with
                confidence.
              </p>
            </div>
          ))}
        </section>

        {/* Pricing Cards */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <div
              key={i}
              className="p-6 rounded-xl shadow-sm border border-base-300 bg-base-100 text-base-content transition-colors"
            >
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="my-4 text-base font-medium text-secondary">
                ${p.price}/mo
              </p>
              <ul className="text-left space-y-2">
                <li>✓ Feature A</li>
                <li>✓ Feature B</li>
                <li>✓ Feature C</li>
              </ul>
              <button className="mt-4 w-full btn btn-primary">
                Choose Plan
              </button>
            </div>
          ))}
        </section>

        {/* Testimonials */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-base-content">
            What Our Users Say
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            {testimonials.map(({ name, quote, rating }) => (
              <div
                key={name}
                className="p-6 rounded-xl shadow bg-base-300 text-base-content border border-base-200 transition-colors max-w-sm"
              >
                <p>“{quote}”</p>
                <StarRating rating={rating} />
                <p className="mt-2 font-semibold text-secondary text-right">
                  — {name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-base-200">
          <div className="max-w-5xl mx-auto px-4 grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <LayoutDashboard className="w-10 h-10 mx-auto text-primary" />
              <h3 className="text-lg font-semibold mt-4">Modular Design</h3>
              <p className="text-sm mt-2 text-base-content/70">
                Easily extend or customize modules to match your use case.
              </p>
            </div>
            <div>
              <Lock className="w-10 h-10 mx-auto text-primary" />
              <h3 className="text-lg font-semibold mt-4">Secure Auth</h3>
              <p className="text-sm mt-2 text-base-content/70">
                JWT + HttpOnly cookies and role-based permissions built-in.
              </p>
            </div>
            <div>
              <DollarSign className="w-10 h-10 mx-auto text-primary" />
              <h3 className="text-lg font-semibold mt-4">Open & Free</h3>
              <p className="text-sm mt-2 text-base-content/70">
                Start building now without worrying about billing.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-base-200 py-16 px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
            <p className="text-sm text-base-content/70 mb-6">
              We’d love to hear from you. Get in touch!
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={errors.contactName ? "input-error" : ""}
              />
              {errors.contactName && (
                <p className="text-red-600 text-xs">{errors.contactName}</p>
              )}

              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.contactEmail ? "input-error" : ""}
              />
              {errors.contactEmail && (
                <p className="text-red-600 text-xs">{errors.contactEmail}</p>
              )}

              <textarea
                rows={4}
                name="message"
                placeholder="Your Message"
                className={`w-full p-2 rounded textarea textarea-bordered bg-base-100 text-base-content ${
                  errors.contactMessage ? "input-error" : ""
                }`}
                value={formData.message}
                onChange={handleChange}
              />
              {errors.contactMessage && (
                <p className="text-red-600 text-xs">{errors.contactMessage}</p>
              )}

              <Button
                type="submit"
                className="w-full"
                variant="primary"
                disabled={loading || sending}
              >
                {loading ? (
                  <Loader className="animate-spin inline-block mr-2" />
                ) : (
                  <CircleArrowOutUpRight />
                )}{" "}
                {loading ? "Sending Message..." : "Send Message"}
              </Button>

              {submitStatus === "success" && (
                <p className="text-green-600 text-center mt-2">
                  Message sent successfully!
                </p>
              )}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
