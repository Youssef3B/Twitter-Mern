const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 40,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 60,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

//  User Model

const User = mongoose.model("user", UserSchema);

module.exports = {
  User,
};
