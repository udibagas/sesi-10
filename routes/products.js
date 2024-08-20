const {
  products,
  buy,
  saveOrder,
} = require("../controllers/products.controller");
const router = require("express").Router();

router.get("/", products);
router.get("/buy/:id", buy);
router.post("/buy/:id", saveOrder);

module.exports = router;
