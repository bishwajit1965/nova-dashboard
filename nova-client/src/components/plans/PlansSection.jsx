import { CheckCircle, Edit2 } from "lucide-react";
import { LucideIcon } from "../../lib/LucideIcons";
import SectionTitle from "../../utility/sectionTitle/SectionTitle";
import Button from "../ui/Button";

const PlansSection = ({ plans, selectedPlanId, handleSelect }) => {
  return (
    <div className="bg-base-200 lg:p-12 p-2 rounded-md shadow-sm border border-base-300">
      <SectionTitle
        title="Plans"
        decoratedText="& Analytics Cards"
        dataLength={plans?.length ? plans?.length : ""}
        icon={<LucideIcon.ListCheck size={30} />}
      />
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans?.map((p, i) => (
          <div
            key={i}
            className="relative min-h-72 p-6 rounded-xl shadow-sm border border-base-300 bg-base-100 text-base-content transition-colors lg:space-y-4 space-y-2"
          >
            <h3 className="lg:text-xl text-lg font-bold flex items-center gap-2">
              <LucideIcon.Package size={20} />
              {p.name}
            </h3>
            <p className="text-base font-bold text-base-content">
              ${p.price}/mo
            </p>
            <ul className="text-left space-y-2">
              {p.features.map((pf, i) => (
                <li key={pf._id || i} className="flex items-center space-x-1">
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
                variant="primary"
                disabled={selectedPlanId === p._id}
                className="rounded-t-none rounded-b-lg w-full"
              >
                {selectedPlanId === p._id ? <Edit2 /> : <CheckCircle />}{" "}
                {selectedPlanId === p._id ? "Chosen Plan" : "Choose Plan"}
              </Button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PlansSection;
