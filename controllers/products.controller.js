const Product = require("../models/product");

exports.products = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.productById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(Number(id));
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.createNewProduct = async (req, res, next) => {
  console.log(req.body);
  const { name, price, stock } = req.body;

  try {
    const newProduct = await Product.create({ name, price, stock });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

exports.updateProductById = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;

  try {
    const product = await Product.update(id, { name, price, stock });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.removeProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Product.remove(Number(id));
    res.status(200).json({
      message: "Product has been deleted",
    });
  } catch (error) {
    next(error);
  }
};
