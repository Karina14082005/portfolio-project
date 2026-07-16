const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  role: {
    type: String,
    default: "Full Stack Developer",
  },

  experience: {
    type: Number,
    default: 0,
  },

  city: {
    type: String,
    required: true,
  },

  skills: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);