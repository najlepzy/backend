import express from "express";
import ProductManager from "../data/Dao/FsProductManager.js";

const ProductEndPoint = express.Router();
const productManager = new ProductManager("data/products.json");

ProductEndPoint.get("/api/products", (request, response) => {
  let products = productManager.getProducts();
  let limit = request.query.limit;
  if (limit == null) return response.send(products);
  products = products.slice(0, limit);
  response.send(products);
});
ProductEndPoint.post("/api/products", (request, response) => {
  // ! No validation.
  productManager.addProduct(request.body);
  response.send(
    JSON.stringify({
      code: "OK",
      product: request.body,
    })
  );
});

ProductEndPoint.get("/api/products/:pid", (request, response) => {
  console.log(request.params);
  let id = productManager.getProductsById(parseInt(request.params.pid));
  console.log(id);
  response.send(id);
});

ProductEndPoint.put("/api/products/:pid", (request, response) => {
  let update = productManager.updateProduct(
    parseInt(request.params.pid),
    request.body
  );
  response.send(update);
});
ProductEndPoint.delete("/api/products/:pid", (request, response) => {
  let deleted = productManager.deleteProduct(parseInt(request.params.pid));
  response.send(deleted);
});

export default ProductEndPoint;
