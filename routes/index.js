const { customers } = require("../controllers");
const router = require("express").Router();

router.use("/products", require("./products"));
router.use("/orders", require("./orders"));
router.get("/customers", customers);

module.exports = router;
