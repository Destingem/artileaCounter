const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: String,
  password: String,
  email: String,
});

module.exports.userModel = mongoose.model("user", userSchema);
