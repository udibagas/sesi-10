const { formatDate } = require("../helpers/date");
const { toRupiah } = require("../helpers/number");
const Customer = require("../models/customer");
const Order = require("../models/order");

exports.home = (req, res) => {
  res.render("home");
};

exports.customers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).render("customers", { customers });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.orders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).render("orders", { orders, toRupiah, formatDate });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.remove(req.params.id);
    res.redirect("/orders");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
