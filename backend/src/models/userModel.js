const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 32,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 512,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    categories: [],
    pinList: [],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
