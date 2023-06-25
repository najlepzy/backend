  import express from "express";
  import CartManager from "../../domain/managers/CartManager.js";

  const cartEndPoint = express.Router();
  const cartManager = new CartManager("data/carts.json");

  cartEndPoint.get("/", async (request, response) => {
    response.send(await cartManager.getCarts());
  });
  cartEndPoint.post("/", async (request,response) => {
    response.send(cartManager.addCart());
  });
  cartEndPoint.post("/:cartId/products/:pid", async (request, response) => {
    cartManager.addProductToCart(request.params.cartId, (request.params.pid));
    response.send(true);
  });

  export default cartEndPoint;
