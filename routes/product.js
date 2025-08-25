const express = require("express");
const productController = require("../controller/product");
const router = express.Router();

router
  .post("/", productController.createproduct)
  .get("/", productController.getAllproducts)
  .get("/:id", productController.getproduct)
  .put("/:id", productController.replaceproduct)
  .patch("/:id", productController.updateproduct)
  .delete("/:id", productController.deleteproduct);
exports.router = router;
