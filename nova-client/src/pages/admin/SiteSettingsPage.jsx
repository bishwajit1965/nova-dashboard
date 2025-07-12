import { useEffect, useState } from "react";

import API_PATHS from "../../common/apiPaths/apiPaths";
import Button from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Loader } from "lucide-react";
import { LucideIcon } from "../../lib/LucideIcons";
import toast from "react-hot-toast";
import { useApiMutation } from "../../common/hooks/useApiMutation";
import { useApiQuery } from "../../common/hooks/useApiQuery";

const BASE_API = import.meta.env.VITE_API_URL || "http://localhost:3000";

const SiteSettingsPage = () => {
  const [errors, setErrors] = useState({});
  const [formToggler, setFormToggler] = useState(false); // false=create, true=edit
  const [settingsData, setSettingsData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState("");
  const [logoFile, setLogoFile] = useState(null); // for file uploads

  const [form, setForm] = useState({
    siteName: "",
    contactEmail: "",
    supportPhone: "",
    footerText: "",
    logoUrl: "",
  });

  // Fetch existing settings
  const {
    data: settings,
    isLoading,
    isError,
    error,
  } = useApiQuery({
    url: API_PATHS.SETTINGS.ENDPOINT,
    queryKey: API_PATHS.SETTINGS.KEY,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  // When entering edit mode, load form and preview
  useEffect(() => {
    if (settingsData) {
      setForm({
        siteName: settingsData.siteName || "",
        contactEmail: settingsData.contactEmail || "",
        supportPhone: settingsData.supportPhone || "",
        footerText: settingsData.footerText || "",
        logoUrl: settingsData.logoUrl || "",
      });
      setLogoPreview(settingsData.logoUrl || "");
      setLogoFile(null);
    }
  }, [settingsData]);

  // When switching to create mode, reset form and previews
  useEffect(() => {
    if (!formToggler) {
      setForm({
        siteName: "",
        contactEmail: "",
        supportPhone: "",
        footerText: "",
        logoUrl: "",
      });
      setLogoPreview("");
      setLogoFile(null);
      setSettingsData(null);
    }
  }, [formToggler]);

  // Handle text input changes (including logoUrl)
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If user edits logoUrl input, clear file upload since URL is overriding it
    if (name === "logoUrl") {
      setLogoFile(null);
      setLogoPreview(value);
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload input change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));

    // Clear logoUrl since file is overriding
    setForm((prev) => ({ ...prev, logoUrl: "" }));
  };

  // Validation rules
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

    // Validate logo: must be either a file or valid URL if entered
    if (!logoFile) {
      if (
        form.logoUrl &&
        !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(form.logoUrl)
      ) {
        newErrors.logoUrl =
          "Logo URL must be a valid image URL (jpg, jpeg, png, gif).";
      }
      if (!form.logoUrl) {
        newErrors.logoUrl =
          "Please upload a logo file or provide a valid logo URL.";
      }
    }

    return newErrors;
  };

  // Unified mutation - decides method/path dynamically
  const mutation = useApiMutation({
    method: formToggler ? "update" : "create",
    path: formToggler
      ? ({ id }) => `${API_PATHS.SETTINGS.ENDPOINT}/${id}`
      : API_PATHS.SETTINGS.ENDPOINT,
    key: API_PATHS.SETTINGS.KEY,
    onSuccess: () => {
      setIsSubmitting(false);
      setFormToggler(false);
      setSettingsData(null);
    },
    onError: (error) => {
      // Axios-style error => error.response?.data
      const serverMsg = error?.response?.data?.message;
      const fallback = "Failed to save settings.";
      toast.error(serverMsg || fallback);
      if (error?.response?.status === 409) {
        setSettingsData(settings);
        setFormToggler(true);
      }
      setIsSubmitting(false);
      console.error(error);
      setIsSubmitting(false);
    },
  });

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors before submitting.");
      setTimeout(() => {
        setIsSubmitting(false);
        setErrors({});
      }, 2000);
      return;
    }
    setErrors({});

    try {
      if (logoFile) {
        // Build FormData for file upload + fields
        const formData = new FormData();
        formData.append("logo", logoFile);
        formData.append("siteName", form.siteName);
        formData.append("contactEmail", form.contactEmail);
        formData.append("supportPhone", form.supportPhone);
        formData.append("footerText", form.footerText);

        if (formToggler) {
          await mutation.mutateAsync({
            id: settingsData._id,
            data: formData,
          });
        } else {
          await mutation.mutateAsync({ data: formData });
        }
      } else {
        // Send JSON data with logoUrl
        const payload = {
          siteName: form.siteName,
          contactEmail: form.contactEmail,
          supportPhone: form.supportPhone,
          footerText: form.footerText,
          logoUrl: form.logoUrl,
        };
        if (formToggler) {
          await mutation.mutateAsync({
            id: settingsData._id,
            data: payload,
          });
        } else {
          await mutation.mutateAsync({ data: payload });
        }
      }
    } catch (error) {
      console.error("Error", error);
      // onError will show toast
    }
  };

  // Handlers to switch between edit and create mode
  const handleDataSet = () => {
    setSettingsData(settings);
    setFormToggler(true);
  };
  const handleDataReset = () => {
    setFormToggler(false);
  };

  if (isLoading)
    return (
      <p className="flex justify-center items-center h-40">
        <Loader className="animate-spin" />
      </p>
    );
  if (isError) return <p>Error loading site settings</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="grid lg:grid-cols-12 grid-cols-1 justify-between gap-6">
      <div className="lg:col-span-6 col-span-12 space-y-2 bg-base-200 rounded-md lg:p-4 p-2">
        <h1 className="text-2xl font-bold">
          {formToggler ? "Update Site Settings Data" : "Add Site Settings Data"}
        </h1>
        <div className="relative">
          <form
            onSubmit={handleSubmit}
            className="space-y-1.5"
            noValidate
            enctype="multipart/form-data"
            method="post"
          >
            <div className="">
              <Input
                name="siteName"
                value={form.siteName}
                onChange={handleChange}
                placeholder="Site Name"
                label="Site Name"
                className=" input-sm"
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
                className=" input-sm"
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
                className=" input-sm"
              />
              {errors.supportPhone && (
                <p className="text-sm text-red-500">{errors.supportPhone}</p>
              )}
            </div>

            <div className="lg:grid lg:grid-cols-12 grid-cols-1 gap-6 items-center justify-between">
              <div className="lg:col-span-9 col-span-12 space-y-2">
                <div className="w-full">
                  <label className="block text-gray-400 text-sm font-medium">
                    Logo (PNG/JPG)
                  </label>
                  <Input
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="file-input input-sm file-input-bordered w-full"
                  />
                </div>
                <div className="w-full">
                  <Input
                    name="logoUrl"
                    value={form.logoUrl}
                    onChange={handleChange}
                    placeholder="Logo URL"
                    label="Or enter Logo URL"
                    className="w-full input-sm"
                  />
                </div>
              </div>
              <div className="lg:col-span-3 col-span-12 w-full rounded-lg relative">
                {errors.logoUrl && (
                  <p className="text-sm text-red-500">{errors.logoUrl}</p>
                )}
                {logoPreview ? (
                  <div className="absolute top-[-55px] right-0 w-full bg-base-100 border border-gray-300 rounded-lg flex justify-end">
                    <img
                      src={logoPreview}
                      alt="logo preview"
                      className="h-[130px] w-[130px] rounded-lg flex justify-end"
                    />
                  </div>
                ) : (
                  <div className="bg-base-300 shadow-sm object-cover absolute top-[-55px] h-[130px] w-[130px] rounded-lg flex items-center justify-center font-bold text-gray-400">
                    Image
                  </div>
                )}
              </div>
            </div>

            <div className="">
              <Input
                name="footerText"
                value={form.footerText}
                onChange={handleChange}
                placeholder="Footer Text"
                label="Footer Text"
                className=""
              />
              {errors.footerText && (
                <p className="text-sm text-red-500">{errors.footerText}</p>
              )}
            </div>
            <div className="pt-2">
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
            <div className="absolute bottom-0 lg:right-[55%] right-[5%]">
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
      </div>
      <div className="lg:col-span-6 col-span-12 bg-base-200 lg:p-4 p-2 rounded-md">
        <h2 className="text-2xl font-bold">Site Settings Data</h2>
        <div className="border border-base-300 rounded-lg">
          <div className="flex justify-center">
            <img src={settings.logoUrl} alt="" className="w-32 h-32" />
          </div>
          <div className="divider m-0"></div>
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
