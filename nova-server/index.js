const express = require("express");
require("dotenv").config();
const cors = require("cors");

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
