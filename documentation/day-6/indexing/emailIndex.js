const User = require("../models/User");

const createEmailIndex = async () => {
  try {
    await User.collection.createIndex(
      { email: 1 },
      { unique: true }
    );

    console.log("Email index created successfully");
  } catch (error) {
    console.log("Index creation error:", error.message);
  }
};

module.exports = createEmailIndex;