import SectionTitle from "../../utility/sectionTitle/SectionTitle";
import AdminAvatar from "../../assets/bishwajit-1.jpg";
import { LucideIcon } from "../../lib/LucideIcons";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import { CircleArrowOutUpRight, Loader } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../lib/api";
const ContactFormSection = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleFormToggle = () => {
    setIsFormOpen((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateContactForm()) return;
    setSubmitStatus("success");
    setSending(true);
    try {
      await api.post("/contact", formData);
      toast.success("📨 Message sent successfully!");
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

  // Simulate loading state for demo purposes
  setTimeout(() => {
    setLoading(false);
    setSubmitStatus(null);
    setErrors(false);
  }, 2000);

  return (
    <div className="bg-base-200 lg:p-12 p-2 rounded-md shadow-sm border border-base-300 lg:space-y-4 space-y-2">
      <SectionTitle
        title="Have Any"
        decoratedText="Questions ?"
        description="We would love to hear from you. Get in touch with me! Or you can unhesitatingly mail me at."
        icon={<LucideIcon.FilePenLine size={30} />}
      />
      <div className="-mt-5 space-y-2">
        <p className="flex items-center justify-center gap-1">
          <LucideIcon.Mail size={16} />
          nova@gmail.com
        </p>
        <div className="flex justify-center">
          <img
            src={AdminAvatar}
            alt="Admin"
            className="w-20 rounded-full shadow-md"
          />
        </div>
      </div>
      <section className=" ">
        <div className="max-w-xl mx-auto text-center space-y-4">
          {isFormOpen && (
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
                {loading ? "Sending Message..." : "Send Message"}
              </Button>

              {submitStatus === "success" && (
                <p className="text-green-600 text-center mt-2">
                  Message sent successfully!
                </p>
              )}
            </form>
          )}
          <Button
            onClick={handleFormToggle}
            variant="outline"
            icon={
              isFormOpen ? LucideIcon.MessageCircleX : LucideIcon.CloudUpload
            }
          >
            {isFormOpen ? "Close Form" : "Leave Your Message"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ContactFormSection;
