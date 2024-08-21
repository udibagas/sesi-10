const Customer = require("../models/customer");

exports.home = (req, res) => {
  res.send("OK");
};

exports.customers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
