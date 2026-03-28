import { LucideIcon } from "../../lib/LucideIcons";
import SectionTitle from "../../utility/sectionTitle/SectionTitle";

const DesignSecurityScopeSection = ({ designSecurityScope }) => {
  return (
    <div className="bg-base-200 lg:p-12 p-2 rounded-md shadow-sm border border-base-300">
      <SectionTitle
        title="Design "
        decoratedText="Security & Offer"
        dataLength={
          designSecurityScope?.length ? designSecurityScope?.length : ""
        }
        icon={<LucideIcon.ShieldUser size={30} />}
      />

      <section className="grid lg:grid-cols-12 grid-cols-1 lg:gap-8 gap-4 justify-between lg:p-4 p-2">
        {designSecurityScope?.map((secScope, i) => (
          <div
            key={i}
            className="lg:col-span-4 col-span-12 lg:space-y-4 spacey-2"
          >
            <div className="w-10 h-10 mx-auto text-primary">
              {<secScope.icon size={30} />}
            </div>
            <h2 className="lg:text-2xl text-lg font-bold">{secScope.title}</h2>
            <p className="text-base text-center text-base-content/70">
              {secScope.securityDescription}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DesignSecurityScopeSection;
