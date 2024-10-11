const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true, // This may be the current setting you want to change
    sparse: true, // Allows null or undefined values without enforcing uniqueness on them
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
