const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ExpressError = require("../utils/errorHandler");
const wrapAsync = require("../utils/wrapAsync");

//create new order
exports.newOrder = wrapAsync(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//get single order
exports.getSingleOrder = wrapAsync(async (req, res, next) => {
  const orders = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!orders) {
    return next(new ExpressError(404, "Order not found"));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

//get logged in user orders
exports.myOrders = wrapAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//get all orders --Admin
exports.getAllOrders = wrapAsync(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += orders.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//Update order status --Admin
exports.updateOderStatus = wrapAsync(async (req, res, next) => {
  const order = await Order.find(req.params.id);

  if (order.status === "Delivered") {
    return next(
      new ExpressError(400, "You have already delivered this product")
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});
