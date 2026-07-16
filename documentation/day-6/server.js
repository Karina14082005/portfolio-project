const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const messageRoutes = require("./routes/messageRoutes");

const createEmailIndex = require("./indexing/emailIndex");

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Portfolio API Running...");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);

// Create Email Index
createEmailIndex();

// Start Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});