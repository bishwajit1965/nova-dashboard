// controllers/billingController.js
const mockCheckout = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user._id;

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // You could log mock billing events here
    console.log(`User ${userId} purchased plan ${planId} (mock)`);

    // Simulate success response
    return res.status(200).json({
      success: true,
      message: "Mock payment successful. Plan activated.",
    });
  } catch (error) {
    console.error("Mock checkout error:", error);
    return res.status(500).json({ message: "Mock billing failed." });
  }
};

module.exports = { mockCheckout };
