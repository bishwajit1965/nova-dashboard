const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
// Importing necessary modules
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");

// Connect to the database
connectDb();

const app = express();

const port = process.env.PORT || 3000;

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// Serve static files from the 'uploads' directory
// app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importing routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
const roleRoutes = require("./routes/roleRoutes");
const auditLogRoutes = require("./routes/auditLogRoutes");
const contactRoutes = require("./routes/contactRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const planRoutes = require("./routes/planRoutes");
const newsLetter = require("./routes/newsletterRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Using routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/audit-logs", auditLogRoutes);
app.use("/api", contactRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/newsletter", newsLetter);
app.use("/api/testimonials", testimonialRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
