const pool = require("../db");
const NotFoundError = require("../errors/notfounderror");
const { toRupiah } = require("../helpers/number");

class Product {
  constructor(id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.status = true; // discontinued
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
      throw new NotFoundError("Product is not found");
    }

    const { id, name, price, stock } = rows[0];
    return new Product(id, name, price, stock);
  }

  static async create({ name, price, stock }) {
    const query = `
      INSERT INTO "Products" 
        ("name", "price", "stock")
      VALUES
        ($1, $2, $3)
      RETURNING *
      `;

    const { rows } = await pool.query(query, [name, price, stock]);
    // { rows, rowCount }
    // rows = [{id: ?, name: name, price: price, stock: stock }]
    const newProduct = rows[0]; // {id: ?, name: name, price: price, stock: stock }
    return new Product(
      newProduct.id,
      newProduct.name,
      newProduct.price,
      newProduct.stock
    );
  }

  static async update(id, { name, price, stock }) {
    const existingProduct = await this.findById(id);

    if (existingProduct.status == false) {
      throw new Error("Product discontinued");
    }

    const query = `
      UPDATE "Products"
      SET
        name = $1,
        price = $2,
        stock = $3
      WHERE
        id = $4
      RETURNING *
    `;

    const { rowCount, rows } = await pool.query(query, [
      name,
      price,
      stock,
      id,
    ]);

    const product = rows[0];
    return new Product(product.id, product.name, product.price, product.stock);
  }

  static async remove(id) {
    await this.findById(id);
    // soft delete
    // const query = `UPDATE "Product" SET "deletedAt" = $1 WHERE id = $2`;
    // const { rows } = await pool.query(query, [new Date(), id]);
    const query = `DELETE FROM "Products" WHERE id = $1 RETURNING *`;
    const { rows } = await pool.query(query, [id]);
    return true;

    // const product = rows[0];
    // return new Product(product.id, product.name, product.price, product.stock);
  }
}

module.exports = Product;
