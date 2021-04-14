const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: ["name is required", true],
    },
    review: {
      type: String,
      required: ["review is required", true],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReviewModel = mongoose.model("Review", reviewSchema);

module.exports = ReviewModel;
