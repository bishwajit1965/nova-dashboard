import { useEffect, useState } from "react";

import API_PATHS from "../../common/apiPaths/apiPaths";
import Button from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Loader } from "lucide-react";
import { LucideIcon } from "../../lib/LucideIcons";
import api from "../../lib/api";
import toast from "react-hot-toast";
import { useApiMutation } from "../../common/hooks/useApiMutation";
import { useApiQuery } from "../../common/hooks/useApiQuery";

const SiteSettingsPage = () => {
  const [errors, setErrors] = useState({});
  const [formToggler, setFormToggler] = useState(false);
  const [settingsData, setSettingsDate] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    siteName: "",
    contactEmail: "",
    supportPhone: "",
    footerText: "",
    logoUrl: "",
  });

  // Fetch site settings
  const {
    data: settings,
    isLoading,
    isError,
    error,
  } = useApiQuery({
    url: API_PATHS.SETTINGS.ENDPOINT,
    queryKey: API_PATHS.SETTINGS.KEY,
    // select: (res) => res.data,//NOT NEEDED HERE AS HOOK DOES IT
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  useEffect(() => {
    if (settingsData) {
      if (settingsData) {
        setForm({
          siteName: settingsData.siteName || "",
          contactEmail: settingsData.contactEmail || "",
          supportPhone: settingsData.supportPhone || "",
          footerText: settingsData.footerText || "",
          logoUrl: settingsData.logoUrl || "",
        });
      }
    }
  }, [settingsData]);

  // Update site settings
  const mutation = useApiMutation({
    method: "update",
    path: ({ id }) => `${API_PATHS.SETTINGS.ENDPOINT}/${id}`,
    key: API_PATHS.SETTINGS.KEY,
    onSuccess: () => {},
    onError: (error) => {
      toast.error("Failed to update settings.");
      console.error(error);
    },
  });

  const validate = () => {
    const newErrors = {};
    if (!form.siteName.trim()) newErrors.siteName = "Site name is required.";
    if (!form.contactEmail.trim()) {
      newErrors.contactEmail = "Contact email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.contactEmail)) {
      newErrors.contactEmail = "Invalid email format.";
    }
    if (!form.supportPhone.trim())
      newErrors.supportPhone = "Phone is required.";
    if (!form.footerText.trim())
      newErrors.footerText = "Footer text is required.";
    if (
      !form.logoUrl &&
      !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(form.logoUrl)
    ) {
      newErrors.logoUrl =
        "Logo URL must be a valid image URL (jpg, jpeg, png, gif).";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDataSet = () => {
    setSettingsDate(settings);
    setFormToggler(true);
  };
  const handleDataReset = () => {
    setSettingsDate({});
    setFormToggler(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors before submitting.");
      // ✅ Reset loader & button after 2 sec
      setTimeout(() => {
        setIsSubmitting(false);
        setErrors({});
      }, 2000);

      return;
    }
    setErrors({});
    try {
      if (!formToggler) {
        await api.post("/settings", form);
      } else {
        mutation.mutate({
          id: settingsData._id, // ✅ Ensure this is available
          data: form,
        });
      }
    } catch (error) {
      toast.error("Failed to save settings.");
      console.log("Error in updating settings", error);
    } finally {
      setTimeout(() => setIsSubmitting(false), 2000); // 👈 smooth delay
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading site settings</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="grid lg:grid-cols-12 grid-cols-1 justify-between gap-6">
      <div className="lg:col-span-6 col-span-12 space-y-4">
        <h1 className="text-2xl font-bold">
          {formToggler ? "Update Site Settings Data" : "Add Site Settings Data"}
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader className="animate-spin" />
          </div>
        ) : (
          <div className="relative">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="">
                <Input
                  name="siteName"
                  value={form.siteName}
                  onChange={handleChange}
                  placeholder="Site Name"
                  label="Site Name"
                />
                {errors.siteName && (
                  <p className="text-sm text-red-500">{errors.siteName}</p>
                )}
              </div>

              <div className="">
                <Input
                  name="contactEmail"
                  type="email"
                  value={form.contactEmail}
                  onChange={handleChange}
                  placeholder="Contact Email"
                  label="Contact Email"
                />
                {errors.contactEmail && (
                  <p className="text-sm text-red-500">{errors.contactEmail}</p>
                )}
              </div>

              <div className="">
                <Input
                  name="supportPhone"
                  value={form.supportPhone}
                  onChange={handleChange}
                  placeholder="Support Phone"
                  label="Support Phone"
                />
                {errors.supportPhone && (
                  <p className="text-sm text-red-500">{errors.supportPhone}</p>
                )}
              </div>
              <div className="">
                <Input
                  name="footerText"
                  value={form.footerText}
                  onChange={handleChange}
                  placeholder="Footer Text"
                  label="Footer Text"
                />
                {errors.footerText && (
                  <p className="text-sm text-red-500">{errors.footerText}</p>
                )}
              </div>
              <div className="">
                <Input
                  name="logoUrl"
                  value={form.logoUrl}
                  onChange={handleChange}
                  placeholder="Logo URL"
                  label="Logo URL"
                />
                {errors.logoUrl && (
                  <p className="text-sm text-red-500">{errors.logoUrl}</p>
                )}
              </div>
              <div className="">
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="primary"
                  className="btn btn-md"
                >
                  {isSubmitting ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <LucideIcon.SquarePlus />
                  )}

                  {formToggler
                    ? "Update Settings"
                    : isSubmitting
                    ? "Updating..."
                    : "Add Settings"}
                </Button>
              </div>
            </form>
            {formToggler && (
              <div className="absolute bottom-0 right-[60%]">
                <Button
                  variant="warning"
                  icon={LucideIcon.X}
                  onClick={handleDataReset}
                  className="btn btn-md"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="lg:col-span-6 col-span-12 space-y-4">
        <h2 className="text-2xl font-bold">Site Settings Data</h2>
        <div className="border border-base-300 p-4 rounded-lg bg-base-200">
          <ul className="space-y-1">
            <li>
              <strong>Site Name:</strong> {settings?.siteName}
            </li>
            <li>
              <strong>Contact Email:</strong> {settings?.contactEmail}
            </li>
            <li>
              <strong>Contact Phone:</strong> {settings?.supportPhone}
            </li>
            <li>
              <strong>Footer Text:</strong> {settings?.footerText}
            </li>
            <li>
              <strong>Logo Url:</strong> {settings?.logoUrl || "No logo set"}
            </li>
            <li>
              <strong>Created at:</strong>{" "}
              {new Date(settings?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </li>
            <li>
              <strong>Updated at:</strong>{" "}
              {new Date(settings?.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              <div className="mt-3">
                <Button icon={LucideIcon.Edit} onClick={handleDataSet}>
                  Update
                </Button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SiteSettingsPage;
