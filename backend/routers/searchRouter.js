const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel.js");

const searchRouter = express.Router();

searchRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const query = req.query.query;
    const page = req.query.page;
    const limit = 4;
    const products = await Product.aggregate([
      {
        $match: {
          $or: [
            { brand: { $regex: query, $options: "i" } },
            { gender: { $regex: query, $options: "i" } },
            { collec: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
          ],
        },
      },
      { $limit: limit * page },
    ]);
    if (products && products.length >= 1) {
      res.send(products);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

module.exports = searchRouter;
