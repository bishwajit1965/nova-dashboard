const NewsletterSubscriber = require("../models/NewsletterSubscriber");

const subscribe = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required." });

  try {
    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: "Already subscribed." });
    }

    const newSubscriber = await NewsletterSubscriber.create({ email });
    res
      .status(201)
      .json({ message: "Subscribed successfully", data: newSubscriber });
  } catch (err) {
    res.status(500).json({ message: "Subscription failed", error: err });
  }
};

const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await NewsletterSubscriber.find().sort({
      subscribedAt: -1,
    });
    res.status(200).json({ data: subscribers });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch subscribers", error: err });
  }
};

// 🔒 ADMIN — delete testimonial
const removeNewsLetter = async (req, res) => {
  await NewsletterSubscriber.findByIdAndDelete(req.params.id);
  res.json({ message: "Newsletter deleted!" });
};

module.exports = {
  subscribe,
  getAllSubscribers,
  removeNewsLetter,
};
