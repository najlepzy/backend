import fs from "fs";
// Exercise cartManager.

class CartManager {
  path; // The route of archive of carts to generate
  carts; // carts.

  __writeToFile() {
    const file = fs.writeFileSync(
      this.path,
      JSON.stringify(this.carts, null, 4)
    );
    if (!fs.existsSync(this.path)) throw `Error writting to file ${this.path}`;
    console.log("Written into " + this.path);
  }

  constructor(path) {
    this.path = path;
    this.carts = [];
    // If it doesn't exist the archive of carts, create it.
    if (!fs.existsSync(this.path)) {
      this.__writeToFile();
    }
  }

  // Add the cart by parameter
  addCart() {
    this.getCarts();
      const id = this.carts.length == 0 ? 1 : this.carts[this.carts.length - 1].id + 1;
      const newCart = { id: id, products: [] }
      this.carts.push(newCart);
      this.__writeToFile();
      return newCart;
  }

  // Return all carts.
  getCarts() {
    const file = fs.readFileSync(this.path, "utf8");
    this.carts = JSON.parse(file);
    if (!this.carts) this.carts = [];
    return this.carts;
  }

  getCartsById(id) {
    this.getCarts();
    let Found = this.carts.find((cart) => cart.id === id);
    if (!Found) {
      console.log("Cart Not Found");
      return null;
    }
    return Found;
  }
  addProductToCart(cartId, ProductId) {
    let Found = this.getCartsById(cartId);
    if (!Found) return false;
    let FoundProduct = Found.products.find(
      (product) => product.id === ProductId
    );
    if (FoundProduct == null)
      Found.products.push({ id: ProductId, quantity: 1 });
    else FoundProduct.quantity++;
    this.__writeToFile();
  }
}

export default CartManager;
