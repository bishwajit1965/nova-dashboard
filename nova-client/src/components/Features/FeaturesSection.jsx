import { LucideIcon } from "../../lib/LucideIcons";
import SectionTitle from "../../utility/sectionTitle/SectionTitle";

const FeaturesSection = ({ features }) => {
  return (
    <div className="bg-base-200 lg:p-12 p-2 rounded-md shadow-sm border border-base-300">
      <SectionTitle
        title="Feature"
        decoratedText="Analytics"
        dataLength={features?.length ? features?.length : ""}
        icon={<LucideIcon.Activity size={30} />}
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
  );
};

export default FeaturesSection;
