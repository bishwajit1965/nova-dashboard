import { useState } from "react";
import { useDocumentHead } from "../hooks/useDocumentHead";
import AdminAvatar from "../assets/bishwajit-1.jpg";
import api from "../lib/api";
import toast from "react-hot-toast";
import SectionTitle from "../utility/sectionTitle/SectionTitle";
import { LucideIcon } from "../lib/LucideIcons";
import { Input } from "../components/ui/Input";
import Button from "../components/ui/Button";
import { CircleArrowOutUpRight, Loader, UploadCloud } from "lucide-react";

const Contact = () => {
  useDocumentHead("Contact • Nova Dashboard", [
    { name: "description", content: "Contact page for Nova Dashboard" },
  ]);

  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

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
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
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
                  <UploadCloud />
                )}
                {loading ? "Sending Message..." : "Send Message"}
              </Button>

              {submitStatus === "success" && (
                <p className="text-green-600 text-center mt-2">
                  Message sent successfully!
                </p>
              )}
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;

// import { useDocumentHead } from "../hooks/useDocumentHead";

// const Contact = () => {
//   useDocumentHead("Contact Me • Nova Dashboard", [
//     { name: "description", content: "Contact me page" },
//   ]);
//   return <div className="">Contact</div>;
// };

// export default Contact;
