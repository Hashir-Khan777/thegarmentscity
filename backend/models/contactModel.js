const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: ["name is required", true],
    },
    email: {
      type: String,
      required: ["email is required", true],
    },
    number: {
      type: Number,
      required: ["number is required", true],
    },
    message: {
      type: String,
      required: ["message is required", true],
    },
  },
  {
    timestamps: true,
  }
);

const ContactModel = mongoose.model("Message", contactSchema);

module.exports = ContactModel;
