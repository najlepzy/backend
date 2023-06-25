import { Server } from "socket.io";
import ProductManager from "../data/Dao/ProductManager.js";
import connectionInstance from "../app.js/index.js";

const ProductsWebSocket = new Server(connectionInstance);
const productManager = new ProductManager();

ProductsWebSocket.on("connection", (client) => {
  client.on("on_connect", (data) => {
    console.log(data);
  });
  client.on("create_product", (data) => {
    console.log(data);
    let newProduct = productManager.addProduct(data);
    client.emit("create_ok", {
      code: "OK",
      product: newProduct,
    });
  });
  client.on("delete_product", (data) => {
    console.log(data.product)
    let deleted = productManager.deleteProduct(parseInt(data.product));
    client.emit("delete_ok", deleted);
  });
  client.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
  
export default ProductsWebSocket;
