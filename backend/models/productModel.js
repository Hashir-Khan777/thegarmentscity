const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    collec: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Number,
      required: true,
      default: 0,
    },
    sizes: {
      type: { Array },
    },
    ratings: {
      type: Number,
      required: true,
      default: 0,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
