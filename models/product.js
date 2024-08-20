const pool = require("../db");
const { toRupiah } = require("../helpers/number");

class Product {
  constructor(id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  get priceInRupiah() {
    return toRupiah(this.price);
  }

  static async findAll() {
    const { rows } = await pool.query(`SELECT * FROM "Products"`);
    return rows.map((el) => {
      return new Product(el.id, el.name, el.price, el.stock);
    });
  }

  static async findById(productId) {
    const { rows, rowCount } = await pool.query(
      `SELECT * FROM "Products" WHERE id = $1`,
      [productId]
    );

    if (!rowCount) {
      throw new Error("Product nor found");
    }

    const { id, name, price, stock } = rows[0];
    return new Product(id, name, price, stock);
  }
}

module.exports = Product;
