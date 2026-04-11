import API_PATHS from "../../common/apiPaths/apiPaths";
import Button from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useApiMutation } from "../../common/hooks/useApiMutation";
import { useApiQuery } from "../../common/hooks/useApiQuery";
import { useState } from "react";
import {
  FaDollarSign,
  FaEdit,
  FaTimes,
  FaTrashAlt,
  FaUser,
} from "react-icons/fa";
import { LucideIcon } from "../../lib/LucideIcons";
const validatePlan = (form) => {
  const errors = {};

  // Name
  if (!form.name.trim()) {
    errors.name = "Plan name is required";
  } else if (form.name.trim().length < 3) {
    errors.name = "Plan name must be at least 3 characters";
  }

  // Tier
  if (!form.tier) {
    errors.tier = "Please select a tier";
  }

  // Price
  if (form.price === "" || form.price === null) {
    errors.price = "Price is required";
  } else if (isNaN(form.price)) {
    errors.price = "Price must be a number";
  } else if (Number(form.price) < 0) {
    errors.price = "Price cannot be negative";
  }

  // Features
  const featuresArray = form.features
    .split(",")
    .map((f) => f.trim())
    .filter(Boolean);

  if (featuresArray.length === 0) {
    errors.features = "At least one feature is required";
  }

  return { errors, featuresArray };
};

const PlansPage = () => {
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    tier: "",
    name: "",
    price: "",
    features: "",
  });

  const [editingId, setEditingId] = useState(null);

  console.log("Plan data", form);

  const {
    data: plans,
    isLoading,
    isError,
    error,
  } = useApiQuery({
    url: API_PATHS.PLANS.ENDPOINT,
    queryKey: API_PATHS.PLANS.KEY,
  });

  console.log("Plans in Plan Page", plans);
  console.log("Errors", errors);

  const mutation = useApiMutation({
    method: editingId ? "update" : "create",
    path: editingId
      ? ({ id }) => `${API_PATHS.PLANS.ENDPOINT}/${id}`
      : API_PATHS.PLANS.ENDPOINT,
    key: API_PATHS.PLANS.KEY,
    onSuccess: () => {
      setForm({ tier: "", name: "", price: "", features: "" });
      setEditingId(null);
      setTimeout(() => {}, 500);
    },
    onError: () => {
      toast.error("Failed to save plan");
    },
  });

  const deleteMutation = useApiMutation({
    method: "delete",
    path: (id) => `${API_PATHS.PLANS.ENDPOINT}/${id}`,
    key: API_PATHS.PLANS.KEY,
    onSuccess: () => {
      setTimeout(() => {}, 500);
    },
    onError: () => toast.error("Failed to delete plan"),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { errors, featuresArray } = validatePlan(form);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      toast.error("Please fill out the form.");
      const id = setTimeout(() => {
        setErrors({});
      }, 3000);

      return () => clearTimeout(id);
    }

    const payload = {
      tier: form.tier,
      name: form.name,
      price: parseFloat(form.price),
      features: featuresArray,
      // features: form.features.split(",").map((f) => f.trim()),
    };
    console.log("🛰 Payload to backend:", payload);
    editingId
      ? mutation.mutate({ id: editingId, data: payload })
      : mutation.mutate({ data: payload });
  };

  const handleEdit = (plan) => {
    setForm({
      tier: plan.tier,
      name: plan.name,
      price: plan.price,
      features: plan.features.map((f) => f.title).join(", "),
    });
    setEditingId(plan._id);
  };

  console.log("Form data in plan page ", form);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError)
    return <div className="text-red-500">Error: {error?.message}</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="lg:p-8 p-2">
        <div className="px- pb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <LucideIcon.CircleGauge /> Manage Billing & Plans
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-base-300 shadow lg:p-8 p-2 rounded-xl"
        >
          <Input
            label="Plan Name"
            type="text"
            name="name"
            icon={FaUser}
            value={form.name}
            onChange={handleChange}
            placeholder="Plan name..."
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Tier</legend>
            <select
              // defaultValue="Select Tie"
              name="tier"
              value={form.tier}
              onChange={handleChange}
              icon={LucideIcon.Package}
              className="input input-bordered w-full select"
            >
              <option value="" disabled>
                Select Tier
              </option>
              <option value="free">Free</option>
              <option value="basic">Basic</option>
              <option value="pro">Pro</option>
              <option value="premium">Premium</option>
              <option value="enterprise">Enterprise</option>
              <option value="annual">Annual</option>
            </select>
          </fieldset>
          {errors.tier && <p className="text-red-500 text-sm">{errors.tier}</p>}

          <Input
            label="Price (USD)"
            name="price"
            type="number"
            value={form.price}
            icon={FaDollarSign}
            onChange={handleChange}
            placeholder="Plan price..."
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}

          <Input
            label="Features (comma-separated)"
            name="features"
            value={form.features}
            onChange={handleChange}
            placeholder="Plan feature..."
            icon={LucideIcon.Package}
          />
          {errors.features && (
            <p className="text-red-500 text-sm">{errors.features}</p>
          )}

          <div className="flex gap-4">
            <Button
              type="submit"
              variant="success"
              size="md"
              icon={FaEdit}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <Loader className="animate-spin" />
              ) : editingId ? (
                "Update"
              ) : (
                "Create"
              )}
            </Button>

            {editingId && (
              <Button
                type="button"
                variant="warning"
                size="md"
                icon={FaTimes}
                onClick={() => {
                  setEditingId(null);
                  setForm({ tier: "", name: "", price: "", features: "" });
                }}
              >
                Cancel Edit
              </Button>
            )}
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <h2 className="lg:text-3xl text-lg font-bold flex items-center gap-2">
          <LucideIcon.FileText /> Users Plans & Billing Table
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full mt-6">
          <thead>
            <tr>
              <th>Name</th>
              <th>Tier</th>
              <th>Price</th>
              <th>Features</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans?.map((plan) => (
              <tr key={plan._id} className="hover:bg-base-200">
                <td>{plan.name}</td>
                <td>{plan.tier}</td>
                <td>${plan.price}</td>
                <td>
                  <ul className="list-disc list-inside space-y-1">
                    {plan.features.map((f, idx) => (
                      <li key={f._id || idx}>{f.title}</li>
                    ))}
                  </ul>
                </td>
                <td className="flex space-x-2">
                  <Button
                    onClick={() => handleEdit(plan)}
                    variant="success"
                    size="sm"
                    icon={FaEdit}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteMutation.mutate(plan._id)}
                    icon={FaTrashAlt}
                    variant="danger"
                    size="sm"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlansPage;
