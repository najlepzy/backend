import express from "express";
import ProductManager from "../../domain/managers/ProductManager.js";

const ProductViews = express.Router();
const productManager = new ProductManager("data/products.json");

ProductViews.get("/", (request, response) => {
  let products = productManager.getProducts();
  response.render("Home", { products: products, WindowTitle: "Products" });
});
ProductViews.get("/RealTimeProducts", (request, response) => {
  let products = productManager.getProducts();
  response.render("RealTimeProducts", { products: products, WindowTitle: "RealTimeProducts" });
});

export default ProductViews;
