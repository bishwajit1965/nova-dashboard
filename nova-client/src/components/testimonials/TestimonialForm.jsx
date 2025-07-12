// components/admin/TestimonialForm.jsx

import { CircleArrowOutUpRight, Loader, X } from "lucide-react";
import { useEffect, useState } from "react";

import API_PATHS from "../../common/apiPaths/apiPaths";
import Button from "../ui/Button";
import { Input } from "../ui/Input";
import Textarea from "../ui/Textarea";
import { testimonialRules } from "../../validation/testimonialValidation";
import toast from "react-hot-toast";
import { useApiMutation } from "../../common/hooks/useApiMutation";
import useValidator from "../../hooks/useValidator";

const emptyForm = {
  authorName: "",
  authorTitle: "",
  avatarUrl: "",
  content: "",
  rating: 5,
  published: true,
};

const TestimonialForm = ({ editData, onCancel }) => {
  // If editData passed we’re in “edit” mode
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState(editData || emptyForm);
  const { errors, validate } = useValidator(testimonialRules, form);

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  // ----- Create / Update mutation ------------------
  const mutation = useApiMutation({
    method: editData ? "update" : "create",
    // POST /api/testimonials  or PATCH /api/testimonials/:id
    path: editData
      ? `${API_PATHS.TESTIMONIALS.ENDPOINT}/${editData._id}`
      : API_PATHS.TESTIMONIALS.ENDPOINT,
    key: API_PATHS.TESTIMONIALS.KEY,

    onSuccess: () => {
      // toast.success(
      //   `Testimonial ${
      //     editData ? "updated successfully" : "created successfully"
      //   }!`
      // );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // ----- Handlers ----------------------------------
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!validate()) return;
      setSubmitStatus("success");
      setSending(true);
      mutation.mutate({ data: form });
      setForm({});
      setSubmitStatus("success");
    } catch (error) {
      console.error("Send failed:", error);
      toast.error("❌ Failed to send message. Try again.");
    } finally {
      setTimeout(() => {
        onCancel();
        setLoading(false); // ⬅️ Loader stops after 2 seconds
        setSubmitStatus(null);
        setForm({});
        setSending(false);
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {/* Author Name */}
      <Input
        label="Author Name"
        name="authorName"
        value={form.authorName}
        onChange={handleChange}
        placeholder="Jane Doe"
        className="input-sm"
        error={errors.authorName}
      />
      {/* Author Title */}
      <Input
        label="Author Title"
        name="authorTitle"
        value={form.authorTitle}
        onChange={handleChange}
        placeholder="CEO, Acme Inc."
        className="input-sm"
        error={errors.authorTitle}
      />
      {/* Avatar URL */}
      <Input
        label="Avatar URL"
        name="avatarUrl"
        value={form.avatarUrl}
        onChange={handleChange}
        placeholder="https://…/avatar.jpg"
        className="input-sm"
        error={errors.avatarUrl}
      />

      {/* Rating */}
      <Input
        label="Rating (1‑5)"
        name="rating"
        type="number"
        min={1}
        max={5}
        value={form.rating}
        onChange={handleChange}
        className="input-sm"
        error={errors.rating}
      />

      {/* Content */}
      <Textarea
        label="Content"
        name="content"
        rows={4}
        value={form.content}
        onChange={handleChange}
        placeholder="The product is wonderful…"
        className="textarea textarea-bordered w-full"
        error={errors.content}
      />

      {/* Published toggle */}
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => setForm({ ...form, published: e.target.checked })}
        />
        <span>Published</span>
      </label>
      <div className="">
        {submitStatus === "success" && (
          <p className="text-green-600 text-center mt-2">
            Testimonial sent successfully!
          </p>
        )}
      </div>
      {/* Buttons */}
      <div className="flex space-x-4 pt-2">
        <Button
          type="submit"
          className=""
          variant="primary"
          disabled={loading || sending}
        >
          {loading ? (
            <Loader className="animate-spin inline-block mr-2" />
          ) : (
            <CircleArrowOutUpRight />
          )}
          {loading
            ? "Sending Testimonial..."
            : editData
            ? "Update Testimonial"
            : "Add Testimonial"}
        </Button>

        {editData && (
          <Button onClick={onCancel} variant="warning">
            <X size={18} /> Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default TestimonialForm;
