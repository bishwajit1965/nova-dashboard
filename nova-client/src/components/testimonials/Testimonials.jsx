import { CircleArrowOutUpRight, Loader } from "lucide-react";

import API_PATHS from "../../common/apiPaths/apiPaths";
import Button from "../ui/Button";
import { Input } from "../ui/Input";
import toast from "react-hot-toast";
import { useApiMutation } from "../../common/hooks/useApiMutation";
import { useState } from "react";

const Testimonials = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const mutation = useApiMutation({
    method: "create",
    path: `${API_PATHS.TESTIMONIALS.ENDPOINT}/plan`, // Not dynamic, fixed path
    key: API_PATHS.TESTIMONIALS.KEY,
    onSuccess: (data) => {
      console.log("Success response:", data);
    },
    onError: (error) => {
      // toast.error("Error in saving plan.");
      console.error(error);
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.value]: e.target.name });
  };

  const validateContactForm = () => {
    const newErrors = {};
    const { name, email, message } = formData;
    if (!name.trim()) newErrors.contactName = "Name is required";
    if (!email.trim()) {
      newErrors.contactEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.contactEmail = "Email is invalid";
    }
    if (!message.trim()) newErrors.contactMessage = "Message is required";
    setErrors(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!validateContactForm()) return;
      setSubmitStatus("success");
      setSending(true);
      mutation.mutate({ data: formData });

      setFormData({ name: "", email: "", message: "" });
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
        setFormData({ name: "", email: "", message: "" });
        setSending(false);
      }, 2000);
    }
  };

  return (
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Send Testimonial</h2>
      <p className="text-sm text-base-content/70 mb-6">
        We’d love to hear from you. Get in touch!
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className={errors.contactName ? "input-error" : ""}
        />
        {errors.contactName && (
          <p className="text-red-600 text-xs">{errors.contactName}</p>
        )}

        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className={errors.contactEmail ? "input-error" : ""}
        />
        {errors.contactEmail && (
          <p className="text-red-600 text-xs">{errors.contactEmail}</p>
        )}

        <textarea
          rows={4}
          name="message"
          placeholder="Your Message"
          className={`w-full p-2 rounded textarea textarea-bordered bg-base-100 text-base-content ${
            errors.contactMessage ? "input-error" : ""
          }`}
          value={formData.message}
          onChange={handleChange}
        />
        {errors.contactMessage && (
          <p className="text-red-600 text-xs">{errors.contactMessage}</p>
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
          {loading ? "Sending Testimonial..." : "Send Testimonial"}
        </Button>

        {submitStatus === "success" && (
          <p className="text-green-600 text-center mt-2">
            Testimonial sent successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default Testimonials;
