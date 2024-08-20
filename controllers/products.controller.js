const Customer = require("../models/customer");
const Order = require("../models/order");
const Product = require("../models/product");

exports.products = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).render("products", { products });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.buy = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const customers = await Customer.findAll();
    res.render("buy", { product, customers });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.saveOrder = async (req, res) => {
  try {
    const { CustomerId, qty } = req.body;
    const ProductId = req.params.id;
    await Order.create({ CustomerId, ProductId, qty });
    res.redirect("/orders");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
