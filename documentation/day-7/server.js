const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Day 7");
});

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => console.log(err));

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});