const Testimonial = require("../models/Testimonial");

// 🟢 PUBLIC — only published testimonials
const getTestimonialsPublished = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ published: true })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ data: testimonials });
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch testimonials" });
  }
};

// 🔒 ADMIN — list all
const getAllTestimonials = async (_, res) => {
  const data = await Testimonial.find().sort({ createdAt: -1 });
  res.json({ data });
};

// 🔒 ADMIN — create new testimonial
const createTestimonial = async (req, res) => {
  try {
    const newT = await Testimonial.create(req.body);
    res
      .status(201)
      .json({ success: true, data: newT, message: "Testimonial created" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🔒 ADMIN — update testimonial
const updateTestimonial = async (req, res) => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json({ data: updated, message: "Testimonial updated." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🔒 ADMIN — delete testimonial
const removeTestimonial = async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

module.exports = {
  getTestimonialsPublished,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  removeTestimonial,
};
