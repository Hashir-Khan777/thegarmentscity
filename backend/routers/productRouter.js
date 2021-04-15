const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data.js");
const Product = require("../models/productModel.js");

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const page = req.query.page;
    const limit = 4;
    const products = await Product.aggregate([
      {
        $project: {
          _id: 1,
          description: 1,
          image: 1,
          price: 1,
          reviews: 1,
          brand: 1,
          sizes: 1,
          shoes: 1,
          walleteStock: 1,
          ratings: 1,
          category: 1,
          collec: 1,
          gender: 1,
          gender: 1,
        },
      },

      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          item: {
            $push: "$$ROOT",
          },
        },
      },

      {
        $project: {
          _id: 0,
          count: 1,
          item: {
            $slice: ["$item", page * limit],
          },
        },
      },
    ]);
    res.send(products);
  })
);

productRouter.get(
  "/productsSeed",
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createProducts = await Product.insertMany(data.products);
    res.send({ createProducts });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

productRouter.patch(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    product.ratings = req.body.ratings;
    const updated_product = await product.save();
    res.send(updated_product);
  })
);

productRouter.patch(
  "/stock/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.updateMany(
      {
        _id: req.params.id,
        "sizes.size": req.body.size,
      },
      {
        "sizes.$.stock": req.body.stock,
      }
    );
    res.send(product);
  })
);

productRouter.patch(
  "/review/:id",
  expressAsyncHandler(async (req, res) => {
    const review = await Product.findById(req.params.id);
    review.reviews = req.body.reviews;
    const update_review = await review.save();
    res.send(update_review);
  })
);

productRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);
    res.send(product);
  })
);

productRouter.put(
  "/update/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.description = req.body.description;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.collec = req.body.collec;
      product.price = req.body.price;
      product.stock = req.body.stock;
      product.gender = req.body.gender;
      product.sizes = req.body.size;
      const update_product = await product.save();
      res.send(update_product);
    }
  })
);

productRouter.post(
  "/create",
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      description: req.body.description,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      collec: req.body.collec,
      price: req.body.price,
      stock: req.body.stock,
      gender: req.body.gender,
      sizes: req.body.size,
    });
    const new_product = await product.save();
    res.send(new_product);
  })
);

module.exports = productRouter;
