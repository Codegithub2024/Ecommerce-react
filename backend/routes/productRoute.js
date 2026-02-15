const express = require("express");
const productRoute = express.Router();
const { addProduct, selectAllProducts, deleteProduct } = require("../controllers/productController");

productRoute.post("/products/add", addProduct);
productRoute.get("/products/all", selectAllProducts);
productRoute.delete("/products/:id/delete", deleteProduct);

module.exports = productRoute;
