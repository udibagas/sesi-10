const pool = require("../db");

class Customer {
  constructor(id, name, gender, email, phone, address) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }

  get title() {
    return this.gender == "M" ? "Mr." : "Mrs.";
  }

  static async findAll() {
    const { rows } = await pool.query(`SELECT * FROM "Customers"`);
    const customers = rows.map((el) => {
      const { id, name, gender, email, phone, address } = el;
      return new Customer(id, name, gender, email, phone, address);
    });
    return customers;
  }
}

module.exports = Customer;
