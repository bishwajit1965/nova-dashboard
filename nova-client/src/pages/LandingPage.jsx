import { BarChart2, History, Loader2, ShieldCheck } from "lucide-react";
import { DollarSign, LayoutDashboard, Lock } from "lucide-react";

import API_PATHS from "../common/apiPaths/apiPaths";
import FaqSection from "../components/FAQ/FaqSection";
import NewsLetter from "../components/newsLetter/NewsLetter";
import ScrollTopButton from "../components/scrollTopButton/ScrollTopButton";
import TestimonialCarousel from "../components/testimonials/TestimonialCarousel";
import { toast } from "react-hot-toast";
import { useApiMutation } from "../common/hooks/useApiMutation";
import { useApiQuery } from "../common/hooks/useApiQuery";
import { useAuth } from "../hooks/useAuth";
import { useDocumentHead } from "../hooks/useDocumentHead";
import useSiteSettings from "../hooks/useSiteSettings";
import { useState } from "react";
import FeaturesSection from "../components/Features/FeaturesSection";
import PlansSection from "../components/plans/PlansSection";
import DesignSecurityScopeSection from "../components/designSecurityScope/DesignSecurityScopeSection";
import HeroSection from "../components/hero/HeroSection";
import ContactFormSection from "../components/contact/ContactFormSection";

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

  const [selectedPlanId, setSelectedPlanId] = useState(user?.plan?._id || null);

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
    <div>
      <main className="lg:py-12 py-4 max-w-7xl mx-auto text-center lg:space-y-20 space-y-6">
        {/* Hero Section */}
        <HeroSection settings={settings} user={user} />

        {/* Features Section */}
        <FeaturesSection features={features} />

        {/* Testimonials section begins */}
        <TestimonialCarousel />

        {/*Plans & Pricing Cards Section */}
        <PlansSection
          plans={plans}
          selectedPlanId={selectedPlanId}
          handleSelect={handleSelect}
        />

        {/*Design, security & Features Section */}
        <DesignSecurityScopeSection designSecurityScope={designSecurityScope} />

        {/* Frequently asked question and answer section */}
        <FaqSection />

        {/* Contact Section */}
        <ContactFormSection />

        {/* NEWS LETTER SECTION BEGINS */}
        <NewsLetter />
      </main>
      {/* Scroll to top button */}
      <div className="height-[2000px]">
        <ScrollTopButton />
      </div>
    </div>
  );
};

export default LandingPage;
