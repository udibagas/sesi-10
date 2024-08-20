const { orders, orderById } = require("../controllers/orders.controller");
const router = require("express").Router();

router.get("/", orders);
router.get("/:id", orderById);

module.exports = router;
