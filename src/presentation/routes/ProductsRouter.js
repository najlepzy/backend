import { Router } from "express";
import mongoose from "mongoose";
import productSchema from "../../data/models-mongoose/ProductSchema.js";
import ProductManager from "../../domain/managers/ProductManager.js";

const mongoRouter = Router();
const productManager = new ProductManager();

/* Endpoint */

mongoRouter.get("/", async (request, response) => {
  const allProducts = await productManager.getProducts(request.query);
  response.send({ status: "success", payload: allProducts });
});
mongoRouter.get("/:id", async (request, response) => {
  const { id } = request.params;
  const getProductsById = await productManager.getProductsById(id);
  if (!getProductsById) return response.send({ status: "error" });
  response.send({ status: "success", payload: getProductsById });
});

mongoRouter.post("/", async (request, response) => {
  let { title, stock, code, price } = request.body;
  if (!title || !stock || !code || !price)
    return response.send({ status: "error", error: "Incomplete values" });
  const newProduct = await productManager.addProduct(request.body);
  response.send({ status: "success", payload: newProduct });
});

mongoRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  let { title, stock, code, price } = request.body;
  if (!title || !stock || !code || !price)
    return response.send({ status: "error", error: "Incomplete values" });
  const newProduct = await productManager.updateProduct(id, request.body);
  response.send({ status: "success", payload: newProduct });
});
mongoRouter.delete("/:id", async (request, response) => {
  let { id } = request.params;
  const deleteProduct = await productManager.deleteProduct(id);
  response.send({ status: "success", payload: result });
});

export default mongoRouter;
