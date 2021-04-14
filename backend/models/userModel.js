const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: ["name is required", true],
    },
    gender: {
      type: String,
      required: ["gender is required", true],
    },
    email: {
      type: String,
      required: true,
      unique: ["email is required", true],
    },
    password: {
      type: String,
      required: ["password is required", true],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    image: {
      type: String,
      required: true,
      default: "/images/demo.png",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
