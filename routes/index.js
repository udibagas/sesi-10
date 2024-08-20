const { home, customers, orders, deleteOrder } = require("../controllers");
const router = require("express").Router();

router.get("/", home);
router.use("/products", require("./products"));
router.get("/customers", customers);
router.get("/orders", orders);
router.get("/orders/delete/:id", deleteOrder);

module.exports = router;
