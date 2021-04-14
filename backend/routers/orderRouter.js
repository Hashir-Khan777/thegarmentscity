const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const OrderModel = require("../models/orderModel.js");
const { isAuth } = require("../utils.js");
const Twocheckout = require("2checkout-node");

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new OrderModel({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const created_order = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: created_order });
    }
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order not found" });
    }
  })
);

orderRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const data = await OrderModel.find({});
    res.send(data);
  })
);

orderRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const order = await OrderModel.findByIdAndRemove(req.params.id);
    res.send(order);
  })
);

orderRouter.put(
  "/deliver",
  expressAsyncHandler(async (req, res) => {
    const order = await OrderModel.findById(req.body.id);
    order.isDelivered = true;
    order.deliveredAt = new Date().toLocaleString();
    const updated_order = await order.save();
    res.send(updated_order);
  })
);

orderRouter.put(
  "/paid",
  expressAsyncHandler(async (req, res) => {
    const order = await OrderModel.findById(req.body.id);
    order.isPaid = true;
    order.paidAt = new Date().toLocaleString();
    const updated_order = await order.save();
    res.send(updated_order);
  })
);

orderRouter.post("/payment", (req, res) => {
  const tco = new Twocheckout({
    apiUser: "khanmursaleen866@gmail.com",
    apiPass: "MursaleenKhan866",
    sellerId: "250836276177",
    privateKey: "D7E0BAE7-31DD-4DB0-96B7-D8B65E94B3EE",
    secretWord: "TQZd!sl3WhcmxrVHfC89",
    demo: true,
    sandbox: false,
  });

  const params = {
    merchantOrderId: req.body.merchantOrderId,
    token: req.body.token,
    currency: req.body.currency,
    total: req.body.total,
    billingAddr: {
      name: req.body.billingAddr.name,
      addrLine1: req.body.billingAddr.addrLine1,
      city: req.body.billingAddr.city,
      state: req.body.billingAddr.state,
      zipCode: req.body.billingAddr.zipCode,
      country: req.body.billingAddr.country,
      email: req.body.billingAddr.email,
      phoneNumber: req.body.billingAddr.phoneNumber,
    },
  };

  tco.checkout.authorize(params, (error, data) => {
    if (error) {
      console.log("errer ==>", error);
      res.status(400).send(error.message);
    } else {
      console.log("data ==>", data);
      res.send(data);
    }
  });
});

module.exports = orderRouter;
