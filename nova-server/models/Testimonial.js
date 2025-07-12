// models/Testimonial.js
const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    authorName: { type: String, required: true },
    authorTitle: { type: String, default: "" }, // e.g. “CEO, Acme Inc.”
    avatarUrl: { type: String, default: "" }, // optional photo
    content: { type: String, required: true, maxlength: 600 },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    published: { type: Boolean, default: false }, // show/hide on home
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
