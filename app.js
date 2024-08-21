var { createHandler } = require("graphql-http/lib/use/express");
var { buildSchema } = require("graphql");
var { ruruHTML } = require("ruru/server");
const express = require("express");
const cors = require("cors");
const Product = require("./models/product");
const Customer = require("./models/customer");
const Order = require("./models/order");
const app = express();
const port = 3000;

// query
var schema = buildSchema(`
  type Query {
    products: [Product]
    product(id: Int): Product
    customers: [Customer]
    customer(id: Int): Customer
    orders: [Order]
    order(id: Int): Order
  }

  type Product {
    id: Int
    name: String
    price: Int
    stock: Int
  }

  type Customer {
    id: Int
    name: String
    gender: String
    phone: String
    email: String
    address: String
  }

  type Order {
    id: Int
    date: String
    qty: Int
    totalAmount: Int
    customer: Customer
    product: Product
  }
`);

// resolver
var root = {
  products: () => Product.findAll(),
  product: ({ id }) => Product.findById(id),
  customers: () => Customer.findAll(),
  customer: ({ id }) => Customer.findById(id),
  orders: () => Order.findAll(),
  order: ({ id }) => Order.findById(id),
};

// app.use(express.urlencoded({ extended: true })); // TODO
app.use(cors()); // handle CORS
app.use(express.json()); // application/json
app.use("/api/v1", require("./routes"));

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

// authentikasi
// app.use(auth);

// all = GET, POST, PUT/PATCH, DELETE
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

app.use((err, req, res, next) => {
  console.log(err);

  if (err.statusCode == 404) {
    return res.status(404).json({
      error: err.name,
      message: err.message,
    });
  }

  res.status(500).json({
    error: "ServerError",
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
