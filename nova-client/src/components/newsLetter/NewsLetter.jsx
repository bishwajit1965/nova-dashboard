import { CircleArrowOutUpRight, Loader } from "lucide-react";

import API_PATHS from "../../common/apiPaths/apiPaths";
import Button from "../ui/Button";
import { Input } from "../ui/Input";
import SocialLinks from "../socialLinks/SocialLinks";
import toast from "react-hot-toast";
import { useApiMutation } from "../../common/hooks/useApiMutation";
import { useState } from "react";

const NewsLetter = () => {
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
  });

  const mutation = useApiMutation({
    method: "create",
    path: `${API_PATHS.NEWS_LETTER.ENDPOINT}/subscribe`,
    key: API_PATHS.NEWS_LETTER.KEY,
    onSuccess: (data) => {
      console.log("Success response:", data);
    },
    onError: (error) => {
      // toast.error("Error in saving plan.");
      console.error(error);
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateContactForm = () => {
    const newErrors = {};
    const { email } = formData;

    if (!email.trim()) {
      newErrors.contactEmail = "Email address is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.contactEmail = "Email is invalid address!";
    }

    setErrors(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!validateContactForm()) return;
      setSubmitStatus("success");
      setSending(true);
      mutation.mutate({ data: formData });
      setFormData({ email: "" });
      setSubmitStatus("success");
      setErrors({});
    } catch (error) {
      console.error("Send failed:", error);
      toast.error("❌ Failed to send message. Try again.");
    } finally {
      setTimeout(() => {
        setLoading(false); // ⬅️ Loader stops after 2 seconds
        setErrors({});
        setSubmitStatus(null);
        setFormData({ email: "" });
        setSending(false);
      }, 2000);
    }
  };

  return (
    <div className="lg:space-y-2 space-y-4 lg:col-span-3 col-span-12">
      <div className="lg:max-w-xl mx-auto">
        <div className="lg:flex grid items-center justify-between lg:space-y-2 space-y-4 lg:mb-0 mb-">
          <span className="lg:order-first order-last">
            <h4 className="font-bold lg:pb-0 pb-">Newsletter</h4>
          </span>
          <span className="lg:pb-0 mb-2">
            <SocialLinks />
          </span>
        </div>
        <form className="space-y-4" onSubmit={handleSubscribe}>
          <Input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address..."
            className={`${
              errors.contactEmail
                ? "input-error bg-amber-200 text-base-100"
                : ""
            } input-sm text-black`}
          />
          {errors.contactEmail && (
            <p className="text-base-100 bg-red-500 text-sm p-1.5 rounded-md">
              {errors.contactEmail}
            </p>
          )}
          <Button
            type="submit"
            className="w-full"
            variant="primary"
            disabled={loading || sending}
          >
            {loading ? (
              <Loader className="animate-spin inline-block mr-2" />
            ) : (
              <CircleArrowOutUpRight />
            )}{" "}
            {loading
              ? "Subscribing News Letter..."
              : "Subscribe to the News letter"}
          </Button>

          {submitStatus === "success" && (
            <p className="text-green-600 font-bold text-center mt-2">
              Newsletter sent successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
