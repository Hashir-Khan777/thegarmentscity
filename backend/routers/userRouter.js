const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data.js");
const ContactModel = require("../models/contactModel.js");
const User = require("../models/userModel.js");
const { generateToken, isAuth } = require("../utils.js");

const userRouter = express.Router();

userRouter.get(
  "/usersSeed",
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createUser = await User.insertMany(data.users);
    res.send({ createUser });
  })
);

userRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const user = await User.find();
    res.send(user);
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (req.body.password === user.password) {
        res.send({
          _id: user._id,
          name: user.name,
          gender: user.gender,
          email: user.email,
          password: user.password,
          image: user.image,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid user email or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      gender: req.body.gender,
      email: req.body.email,
      password: req.body.password,
      image: req.body.image,
    });
    const created_user = await user.save();
    res.send({
      _id: created_user._id,
      name: created_user.name,
      gender: created_user.gender,
      email: created_user.email,
      password: created_user.password,
      image: created_user.image,
      token: generateToken(created_user),
    });
  })
);

userRouter.post(
  "/posts",
  expressAsyncHandler(async (req, res) => {
    const message = new ContactModel({
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      message: req.body.message,
    });
    const new_message = await message.save();
    res.send({
      name: new_message.name,
      email: new_message.email,
      number: new_message.number,
      message: new_message.message,
    });
  })
);

userRouter.get(
  "/posts",
  expressAsyncHandler(async (req, res) => {
    const new_message = await ContactModel.find({});
    res.send(new_message);
  })
);

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.gender = req.body.gender || user.gender;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.image = req.body.image || user.image;
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        gender: updatedUser.gender,
        email: updatedUser.email,
        password: updatedUser.password,
        image: updatedUser.image,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.post(
  "/admin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (req.body.password === user.password && user.isAdmin === true) {
        res.send({
          _id: user._id,
          name: user.name,
          gender: user.gender,
          email: user.email,
          password: user.password,
          isAdmin: user.isAdmin,
          image: user.image,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid admin email or password" });
  })
);

module.exports = userRouter;
