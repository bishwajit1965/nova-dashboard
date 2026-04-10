import Button from "../ui/Button";
import { LucideIcon } from "../../lib/LucideIcons";
import SocialLinks from "../socialLinks/SocialLinks";

const HeroSection = ({ settings, user }) => {
  return (
    <section className="bg-base-200 lg:p-12 p-2 rounded-md shadow-sm border border-base-300 lg:space-y-6 space-y-2">
      <div className="flex justify-center">
        <img src={settings.logoUrl} alt="Logo" className="w-52" />
      </div>
      <h1 className="lg:text-5xl text-2xl font-extrabold text-base-content">
        <span className="text-amber-600 capitalize">
          {user?.name ? user.name : "Please Login to -"}
        </span>{" "}
        {settings.siteName}
      </h1>

      <p className="text-lg text-base-content">
        Manage your content, users, and data effortlessly with our all-in-one
        admin platform.
      </p>
      <div className="lg:flex flex-1 items-center justify-center lg:space-x-4 lg:space-y-0 space-y-4">
        <Button
          href="/register"
          variant="cyan"
          size="md"
          className="lg:w-56 w-full"
          icon={LucideIcon.UserCog2}
        >
          Register & Start Free
        </Button>

        <Button
          href="/dashboard"
          variant="success"
          icon={LucideIcon.CircleGauge}
          size="md"
          className="lg:w-56 w-full"
        >
          Your Dashboard
        </Button>
      </div>
      <div className="flex justify-center">
        <SocialLinks />
      </div>
    </section>
  );
};

export default HeroSection;
