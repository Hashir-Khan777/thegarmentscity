const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routers/userRouter.js");
const productRouter = require("./routers/productRouter.js");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const orderRouter = require("./routers/orderRouter.js");
const reviewRouter = require("./routers/reviewRouter");
const searchRouter = require("./routers/searchRouter.js");

dotenv.config();
const app = express();

app.use(bodyparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/search", searchRouter);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(process.env.PORT);
