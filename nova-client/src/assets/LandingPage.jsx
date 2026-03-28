import {
  BarChart2,
  CheckCircle,
  CircleGauge,
  Edit2,
  History,
  Loader,
  Loader2,
  ShieldCheck,
  UserCog2,
} from "lucide-react";
import {
  CircleArrowOutUpRight,
  DollarSign,
  LayoutDashboard,
  Lock,
} from "lucide-react";

import API_PATHS from "../common/apiPaths/apiPaths";
import Button from "../components/ui/Button";
import FaqSection from "../components/FAQ/FaqSection";
import { Input } from "../components/ui/Input";
import { Link } from "react-router-dom";
import { LucideIcon } from "../lib/LucideIcons";
import NewsLetter from "../components/newsLetter/NewsLetter";
import ScrollTopButton from "../components/scrollTopButton/ScrollTopButton";
import TestimonialCarousel from "../components/testimonials/TestimonialCarousel";
import api from "../lib/api";
import { toast } from "react-hot-toast";
import { useApiMutation } from "../common/hooks/useApiMutation";
import { useApiQuery } from "../common/hooks/useApiQuery";
import { useAuth } from "../hooks/useAuth";
import { useDocumentHead } from "../hooks/useDocumentHead";
import useSiteSettings from "../hooks/useSiteSettings";
import { useState } from "react";
import SectionTitle from "../utility/sectionTitle/SectionTitle";
import Avatar from "../assets/"

const features = [
  {
    title: "Role-based Access",
    icon: ShieldCheck,
    featureDescription:
      "Powerful role-based access control management that protects and scales your platform with security & confidence.",
  },
  {
    title: "Audit Logs",
    icon: History,
    featureDescription:
      "Here you will find the audit log data for the protection and security of your sensitive data handling in s glimpse.",
  },
  {
    title: "Analytics Dashboard",
    icon: BarChart2,
    featureDescription:
      "Admin dashboard contains all data with analytics and calculation as you can visualize all the data summary with a single click.",
  },
];

const designSecurityScope = [
  {
    title: "Modular Design",
    icon: LayoutDashboard,
    securityDescription:
      "Easily extend or customize modules to match your use case.",
  },
  {
    title: "Secure Auth",
    icon: Lock,
    securityDescription:
      "JWT + HttpOnly cookies and role-based permissions built-in.",
  },
  {
    title: "Open & Free",
    icon: DollarSign,
    securityDescription: "Start building now without worrying about billing.",
  },
];

const LandingPage = () => {
  useDocumentHead("Home Page • Nova Dashboard", [
    { name: "description", content: "Landing page" },
    { property: "og:title", content: "Nova Pricing" },
  ]);
  const { user, updateUserPlan } = useAuth();
  const { settings } = useSiteSettings();
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(user?.plan?._id || null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Fetch plans data
  const {
    data: plans,
    isLoading,
    isError,
    error,
  } = useApiQuery({
    url: API_PATHS.PLANS.ENDPOINT,
    queryKey: API_PATHS.PLANS.KEY,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  const mutation = useApiMutation({
    method: "update",
    path: `${API_PATHS.USERS.ENDPOINT}/plan`, // Not dynamic, fixed path
    key: API_PATHS.USERS.KEY,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
    onSuccess: (data) => {
      const updatedPlan = data?.plan || data?.user?.plan;
      if (updatedPlan) {
        updateUserPlan(updatedPlan);
        setSelectedPlanId(updateUserPlan._id);
      }
    },
    onError: (error) => {
      toast.error("Error in saving plan.");
      console.error(error);
    },
  });

  const handleSelect = (planId) => {
    setSelectedPlanId(planId);
    mutation.mutate(
      { data: { planId } },
      {
        onSuccess: (response) => {
          const updatedPlan = response?.data?.plan;
          if (updatedPlan) {
            updateUserPlan(updatedPlan);
            toast.success("Plan updated successfully!");
          } else {
            toast.error("Plan updated, but failed to update user state.");
            console.error("Missing updated plan in response", response);
          }
        },
      },
    );
  };

  // const handleSelect = (planId) => {
  //   setSelectedPlanId(planId);
  //   mutation.mutate({
  //     data: { planId },
  //     onSuccess: (updatedUser) => {
  //       updateUserPlan(updatedUser);
  //     },
  //   });
  // };

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

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader2 />
      </div>
    );
  if (isError)
    return <div className="flex justify-center">{isError.message}</div>;
  if (error) return <div className="flex justify-center">{error.message}</div>;

  return (
    <>
      <div>
        <main className="lg:py-12 py-4 max-w-7xl mx-auto text-center lg:space-y-20 space-y-6">
          {/* Hero Section */}
          <section className="space-y-6 bg-base-200 lg:py-16 py-4 rounded-md">
            <div className="flex justify-center">
              <img src={settings.logoUrl} alt="" className="w-28 h-w-28" />
            </div>
            <h1 className="lg:text-5xl text-2xl font-extrabold text-base-content">
              <span className="text-amber-600 capitalize">
                {" "}
                {user?.name ? user.name : "Please Login to -"}
              </span>{" "}
              {settings.siteName}
            </h1>

            <p className="text-lg text-secondary">
              Manage your content, users, and data effortlessly with our
              all-in-one admin platform.
            </p>
            <div className="lg:flex flex-1 items-center justify-center lg:space-x-4 lg:space-y-0 space-y-4 p-2">
              <Link to="/register" className="lg:w- block">
                <Button
                  variant="cyan"
                  className="btn btn-md lg:w-44 block w-full"
                  icon={UserCog2}
                >
                  Register & Start Free
                </Button>
              </Link>
              <Link to="/dashboard" className="lg:w-44 block">
                <Button icon={CircleGauge} className="btn btn-md block w-full">
                  Your Dashboard
                </Button>
              </Link>
            </div>
          </section>

          {/* Features Section */}
          <div className="">
            <SectionTitle
              title="Feature "
              decoratedText="Analytics"
              dataLength={features?.length ? features?.length : ""}
            />
            <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features?.map((feature, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl shadow border border-base-300 bg-base-100 text-base-content"
                >
                  <h3 className="text-xl text-center font-semibold mb-2 flex items-center justify-center gap-2">
                    <feature.icon />
                    {feature.title}
                  </h3>
                  <p>{feature.featureDescription}</p>
                </div>
              ))}
            </section>
          </div>

          {/* Testimonials section begins */}
          <section className="">
            <TestimonialCarousel />
          </section>

          {/* Pricing Cards */}
          <div className="">
            <SectionTitle
              title="Plans"
              decoratedText="Analytics Cards"
              dataLength={plans?.length ? plans?.length : ""}
              icon={<LucideIcon.ListCheck />}
            />

            <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans?.map((p, i) => (
                <div
                  key={i}
                  className="relative min-h-72 p-6 rounded-xl shadow-sm border border-base-300 bg-base-100 text-base-content transition-colors lg:space-y-4 space-y-2"
                >
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  <p className="my-4 text-base font-medium text-secondary">
                    ${p.price}/mo
                  </p>
                  <ul className="text-left space-y-2">
                    {p.features.map((pf, i) => (
                      <li
                        key={pf._id || i}
                        className="flex items-center space-x-1"
                      >
                        <span>{<LucideIcon.CircleCheck size={18} />}</span>{" "}
                        <span>{pf.title}</span>
                      </li>
                    ))}
                  </ul>
                  {selectedPlanId === p._id && (
                    <p className="font-bold text-xl flex justify-center text-blue-600 py-2 items-center space-x-2">
                      <span>{<LucideIcon.CircleCheck size={25} />}</span>
                      <span>Plan is selected</span>
                    </p>
                  )}
                  <div className="absolute bottom-0 left-0 w-full lg:pt-4">
                    <Button
                      onClick={() => handleSelect(p._id)}
                      disabled={selectedPlanId === p._id}
                      className="mt-4 w-full btn btn-primary rounded-b-lg"
                    >
                      {selectedPlanId === p._id ? <Edit2 /> : <CheckCircle />}{" "}
                      {selectedPlanId === p._id ? "Chosen Plan" : "Choose Plan"}
                    </Button>
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Features */}
          <div className="">
            <SectionTitle
              title="Design "
              decoratedText="Security & Offer"
              dataLength={
                designSecurityScope?.length ? designSecurityScope?.length : ""
              }
              icon={<LucideIcon.PackageCheckIcon />}
            />

            <section className="lg:py-16 py-8 bg-base-200">
              <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-8 gap-4 justify-between lg:p-4 p-2">
                {designSecurityScope?.map((secScope, i) => (
                  <div
                    key={i}
                    className="lg:col-span-4 col-span-12 lg:space-y-4 spacey-2"
                  >
                    <div className="w-10 h-10 mx-auto text-primary">
                      {<secScope.icon size={45} />}
                    </div>
                    <h2 className="lg:text-2xl text-lg font-bold">
                      {secScope.title}
                    </h2>
                    <p className="text-base text-center text-base-content/70">
                      {secScope.securityDescription}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Frequently asked question and answer section */}
          <section className="rounded-md shadow-sm">
            <FaqSection />
          </section>

          {/* Contact */}
          <div className="">
            <SectionTitle
              title="Have Any"
              decoratedText="Questions ?"
              description="We would love to hear from you. Get in touch!"
            />
            <section className="bg-base-200 border border-base-300 rounded-md shadow-sm lg:py-16 py-4 lg:px-4 px-2">
              <div className="max-w-xl mx-auto text-center">

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
                    <p className="text-red-600 text-xs">
                      {errors.contactEmail}
                    </p>
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
                    <p className="text-red-600 text-xs">
                      {errors.contactMessage}
                    </p>
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
          </div>

          {/* NEWS LETTER SECTION BEGINS */}
          <section className="bg-base-200 lg:py-16 py-4 lg:px-4 px-2">
            <NewsLetter />
          </section>
        </main>
        {/* Scroll to top button */}
        <div className="height-[2000px]">
          <ScrollTopButton />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
