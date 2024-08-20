const NotFoundError = require("../errors/notfounderror");
const Customer = require("../models/customer");
const Order = require("../models/order");
const Product = require("../models/product");

exports.products = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "ServerError",
      message: error.message,
    });
  }
};

exports.productById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(Number(id));
    res.status(200).json(product);
  } catch (error) {
    console.log(error);

    if (error.statusCode == 404) {
      return res.status(404).json({
        error: error.name,
        message: error.message,
      });
    }

    res.status(500).json({
      error: "ServerError",
      message: error.message,
    });
  }
};

exports.createNewProduct = async (req, res) => {
  console.log(req.body);
  const { name, price, stock } = req.body;

  try {
    const newProduct = await Product.create({ name, price, stock });
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "ServerError",
      message: error.message,
    });
  }
};

exports.updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;

  try {
    const product = await Product.update(id, { name, price, stock });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);

    if (error instanceof NotFoundError) {
      return res.status(404).json({
        error: error.name,
        message: error.message,
      });
    }

    res.status(500).json({
      error: "ServerError",
      message: error.message,
    });
  }
};

exports.removeProductById = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.remove(Number(id));
    res.status(200).json({
      message: "Product has been deleted",
    });
  } catch (error) {
    console.log(error);

    if (error instanceof NotFoundError) {
      return res.status(404).json({
        error: error.name,
        message: error.message,
      });
    }

    res.status(500).json({
      error: "ServerError",
      message: error.message,
    });
  }
};
