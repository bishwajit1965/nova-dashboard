import API_PATHS from "../../common/apiPaths/apiPaths";
import Button from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useApiMutation } from "../../common/hooks/useApiMutation";
import { useApiQuery } from "../../common/hooks/useApiQuery";
import { useState } from "react";

const PlansPage = () => {
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
    onError: () => toast.error("Failed to save plan"),
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
    const payload = {
      tier: form.tier,
      name: form.name,
      price: parseFloat(form.price),
      features: form.features.split(",").map((f) => f.trim()),
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
      // features: plan.features.join(", "),
      features: plan.features.map((f) => f.key).join(", "),
    });
    setEditingId(plan._id);
  };

  console.log("Form data in plan page ", form);
  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError)
    return <div className="text-red-500">Error: {error?.message}</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Manage Billing Plans</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-base-200 p-4 rounded-xl"
      >
        <Input
          label="Plan Name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Plan name..."
        />

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Tier</legend>
          <select
            // defaultValue="Select Tie"
            name="tier"
            value={form.tier}
            onChange={handleChange}
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
          </select>
        </fieldset>

        <Input
          label="Price (USD)"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Plan price..."
        />

        <Input
          label="Features (comma-separated)"
          name="features"
          value={form.features}
          onChange={handleChange}
          placeholder="Plan feature..."
        />

        <Button type="submit" disabled={mutation.isPending}>
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
            variant="ghost"
            onClick={() => {
              setEditingId(null);
              setForm({ tier: "", name: "", price: "", features: "" });
            }}
          >
            Cancel Edit
          </Button>
        )}
      </form>

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
            <tr key={plan._id} className="hover:bg-base-100">
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
                <Button onClick={() => handleEdit(plan)} variant="secondary">
                  Edit
                </Button>
                <Button
                  onClick={() => deleteMutation.mutate(plan._id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlansPage;
