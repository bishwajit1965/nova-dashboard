import {
  CheckCheck,
  CheckCheckIcon,
  CheckCircle,
  CheckCircle2,
  Loader,
} from "lucide-react";
import { useContext, useState } from "react";

import API_PATHS from "../../common/apiPaths/apiPaths";
import Button from "../ui/Button";
import Card from "../ui/Card";
import ConfirmDialog from "../ui/ConfirmDialog";
import { Link } from "react-router-dom";
import { LucideIcon } from "../../lib/LucideIcons";
import Modal from "../ui/Modal";
import PlanContext from "../../planContext/PlanContext";
import toast from "react-hot-toast";
import { useApiMutation } from "../../common/hooks/useApiMutation";
import { useAuth } from "../../hooks/useAuth";

const PlanCard = () => {
  const { user: loggedUser, updateUserPlan } = useAuth();
  const { user, plans, isLoading, isError, error } = useContext(PlanContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loaderDelay, setLoaderDelay] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState(
    loggedUser?.plan?._id ?? null
  );

  console.log("Logged User=>", loggedUser);
  console.log("User=>", user);
  console.log("Selected plan id=>", selectedPlanId);
  console.log("Selected plan=>", selectedPlan);

  // Update plan
  const mutation = useApiMutation({
    method: "update",
    path: `${API_PATHS.USERS.ENDPOINT}/plan`, // Not dynamic, fixed path
    key: API_PATHS.CURRENT_USER_PLAN.KEY,
    onSuccess: () => {
      setLoaderDelay(true);
      setTimeout(() => {
        setSuccessMsg("Your newly upgraded plan is this!!!");
        setSelectedPlanId(null);
        setSelectedPlan(null);
        setIsModalOpen(false);
      }, 3000);
    },
    onError: (error) => {
      toast.error("Error in saving plan.");
      console.error(error);
    },
  });

  // Delete plan
  const { mutate: deletePlan } = useApiMutation({
    method: "delete",
    path: `${API_PATHS.USERS.ENDPOINT}/plan`,
    key: API_PATHS.USERS.KEY,
    onSuccess: () => {
      setConfirmDelete(null);
      updateUserPlan(null);
    },
    onError: (error) => {
      toast.error("Error deleting permission");
      setConfirmDelete(null);
      console.error(error);
    },
  });

  const openUpgradeModal = (user) => {
    setSelectedPlan(user);
    setIsModalOpen(true);
  };

  const closePlanModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const handleSelect = (planId) => {
    setSelectedPlanId(planId);
    mutation.mutate({ data: { planId } });
  };

  /**  ------------  Derivatives  ------------ */
  const priceFormatted = user?.plan?.price?.toLocaleString("en-BD", {
    style: "currency",
    currency: "BDT",
  });

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );

  if (isError)
    return <div className="flex justify-center">{isError.message}</div>;

  if (error) return <div className="flex justify-center">{error.message}</div>;

  return (
    <div className="lg:p-4 lg:min-h-[calc(100vh-262px)] flex justify-center items-start">
      {loggedUser ? (
        <Card className="w-full max-w-md shadow-lg rounded-2xl bg-base-100">
          <div className="lg:p-6 bg-base-100 space-y-2">
            <h2 className="text-2xl font-bold capitalize">
              {loggedUser?.name} / {user?.plan?.tier} Plan
            </h2>
            <div className="divider my-2"></div>

            <p className="text-xl mb-4 font-semibold">
              {priceFormatted ?? "00"} / month
            </p>

            <ul className="list-disc space-y-1">
              {user?.plan?.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center space-x-2 capitalize"
                >
                  <span>
                    <CheckCircle2 size={18} />
                  </span>
                  <span>{feature.title}</span>
                </li>
              ))}
            </ul>

            <p className="font-semibold flex items-center space-x-2">
              <span className="flex items-center space-x-2">
                <span>{<LucideIcon.Clock size={18} />}</span>
                <span>Chosen at:</span>
              </span>
              <span className="flex items-center">
                {new Date(user?.plan?.createdAt).toLocaleDateString()}
              </span>
            </p>

            <p className="font-semibold flex items-center space-x-2">
              <span className="flex items-center space-x-2">
                <span>{<LucideIcon.CalendarClock size={18} />}</span>
                <span>Updated at:</span>
              </span>
              <span className="flex items-center">
                {new Date(user?.plan?.updatedAt).toLocaleDateString()}
              </span>
            </p>

            {successMsg && (
              <p className="font-bold flex justify-start text-indigo-600">
                <CheckCheckIcon />
                {setTimeout(() => {
                  setSuccessMsg("");
                }, 3000)}
                {successMsg}
              </p>
            )}

            <div className="pt-4">
              <Button icon={LucideIcon.Edit} onClick={openUpgradeModal}>
                Change Plan
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <div className="">
          <p className="flex justify-center text-xl font-bold">
            You have not chosen any plan yet!
          </p>
          <Link to="/">
            <Button icon={LucideIcon.Home} variant="primary">
              Can choose a plan Here
            </Button>
          </Link>
        </div>
      )}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closePlanModal}
          title={`${loggedUser?.name} - Upgrade Your Chosen Plan`}
          className="w-full lg:!max-w-[58vw] max-h-[80vh] overflow-y-auto"
        >
          {plans.length ? (
            <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between lg:max-w-5xl max-w-full">
              {plans.map((plan) => {
                const isCurrent = plan._id === user?.plan?._id;
                return (
                  <div key={plan._id} className="lg:col-span-4 col-span-12">
                    <Card
                      className={`${
                        isCurrent
                          ? "border border-blue-500 bg-base-200 animate-pulse"
                          : ""
                      } w-full max-w-full shadow-lg rounded-2xl min-h-[18rem] border border-base-100`}
                    >
                      <div className="p-2 relative min-h-[18rem]">
                        <div className="space-y-2">
                          <h2
                            className={`${
                              isCurrent ? "text-red-500" : ""
                            } text-xl font-bold m-0`}
                          >
                            {plan?.name}
                          </h2>
                          <div className="divider m-0"></div>
                          <p>
                            {isCurrent ? (
                              <span className="flex items-center space-x-1 font-bold text-red-600">
                                <span>
                                  <CheckCheck size={20} />
                                </span>
                                <span>Your Present Plan</span>
                              </span>
                            ) : (
                              <span className="flex items-center space-x-1 font-bold text-indigo-600">
                                <span>
                                  <CheckCircle size={16} />
                                </span>
                                <span>You Can Upgrade to this</span>
                              </span>
                            )}
                          </p>
                          <ul>
                            {plan?.features?.map((feature, idx) => (
                              <li
                                key={idx}
                                className="flex items-center space-x-2"
                              >
                                <span>
                                  {<LucideIcon.CircleCheck size={16} />}
                                </span>
                                <span>{feature.title}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="font-bold">
                            {plan?.price.toLocaleString("en-BD", {
                              style: "currency",
                              currency: "BDT",
                            })}
                            / month
                          </p>
                        </div>
                        <div className="lg:pb-6">
                          {selectedPlanId === plan._id && (
                            <p className="font-bold text-md flex justify-items-start text-blue-600 py-2 items-center space-x-2 animate-pulse">
                              <span>
                                {<LucideIcon.CircleCheck size={15} />}
                              </span>
                              <span>Plan is selected</span>
                            </p>
                          )}
                        </div>
                        <div className="mt-5 flex space-x-4 absolute bottom-2">
                          {isCurrent ? (
                            <Button
                              onClick={() => setConfirmDelete(plan)}
                              variant="danger"
                              className="btn btn-sm"
                            >
                              <LucideIcon.Trash2 size={14} /> Delete
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleSelect(plan._id)}
                              disabled={selectedPlanId === plan._id}
                              className="btn btn-sm"
                            >
                              {selectedPlanId === plan._id ? (
                                <LucideIcon.Loader2
                                  size={14}
                                  className="animate-spin"
                                />
                              ) : (
                                <LucideIcon.Edit size={14} />
                              )}{" "}
                              Upgrade
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          ) : (
            "No plan is available now!"
          )}
          <div className="pt-6 flex justify-end">
            <Button
              onClick={closePlanModal}
              type="button"
              variant="danger"
              icon={LucideIcon.X}
              className="btn btn-sm"
            >
              Close
            </Button>
          </div>
        </Modal>
      )}
      {/* Plan Delete Confirm Dialogue */}
      {confirmDelete && (
        <ConfirmDialog
          isOpen={confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() => deletePlan(confirmDelete._id)}
        />
      )}
    </div>
  );
};

export default PlanCard;
