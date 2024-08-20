const Order = require("../models/order");

exports.orders = async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

exports.orderById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(Number(id));
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
