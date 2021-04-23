const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const ReviewModel = require("../models/reviewModel");
const reviewRouter = express.Router();

reviewRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const new_review = new ReviewModel({
      name: req.body.name,
      review: req.body.review,
      product: req.headers.id,
      user: req.headers.user,
    });
    const created_review = await new_review.save();
    res.send(created_review);
  })
);

reviewRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const reviews = await ReviewModel.find({});
    res.send(reviews);
  })
);

reviewRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const delete_reviews = await ReviewModel.findByIdAndDelete(req.params.id);
    res.send(delete_reviews);
  })
);

module.exports = reviewRouter;
