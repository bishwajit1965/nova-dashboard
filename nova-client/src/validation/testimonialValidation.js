// testimonialValidation.js
export const testimonialRules = {
  authorName: {
    required: { message: "Author name is required" },
    minLength: { value: 3, message: "Minimum 3 characters" },
  },
  authorTitle: {
    required: { message: "Author title is required" },
    minLength: { value: 2, message: "Title too short" },
  },
  content: {
    required: { message: "Testimonial text is required" },
    minLength: { value: 10, message: "Say a bit more (min 10 chars)" },
  },
  rating: {
    required: { message: "Rating (1–5) required" },
    custom: (val) =>
      val < 1 || val > 5 ? "Rating must be between 1 and 5" : undefined,
  },
  avatarUrl: {
    required: { message: "Author URL is required" },
    pattern: {
      value: /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i,
      message: "Must be a valid image URL",
    },
  },
};
