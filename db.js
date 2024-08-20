const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "my_store",
  idleTimeoutMillis: 100,
});

module.exports = pool;
