const { home, customers, orders, deleteOrder } = require("../controllers");
const router = require("express").Router();

router.get("/", home);
router.use("/products", require("./products"));
router.use("/orders", require("./orders"));
router.get("/customers", customers);

module.exports = router;
