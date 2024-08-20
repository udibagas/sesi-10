const {
  products,
  productById,
  createNewProduct,
  updateProductById,
  removeProductById,
} = require("../controllers/products.controller");
const router = require("express").Router();

// READ
router.get("/", products); // read all products
router.get("/:id", productById); // read single product based on id
// CREATE
router.post("/", createNewProduct); // create new product
// UPDATE
router.put("/:id", updateProductById); // update product based on id
// DELETE
router.delete("/:id", removeProductById); // delete product based on id

module.exports = router;
