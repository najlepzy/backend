import fs from "fs";

// Exercise ProductManager.

class ProductManager {
  path; // The route of archive of products to generate
  products; // Products.

  __writeToFile() {
    const file = fs.writeFileSync(
      this.path,
      JSON.stringify(this.products, null, 4)
    );
    if (!fs.existsSync(this.path)) throw `Error writting to file ${this.path}`;
    console.log("Written into " + this.path);
  }

  constructor(path) {
    this.path = path;
    this.products = [];
    // If it doesn't exist the archive of products, create it.
    if (!fs.existsSync(this.path)) {
      this.__writeToFile();
    }
  }

  // Add the product by parameter
  addProduct(product) {
    this.getProducts();
    product.id =
      this.products.length == 0
        ? 1
        : this.products[this.products.length - 1].id + 1;
    this.products.push(product);
    this.__writeToFile();
    return product;
  }

  // Return all products.
  getProducts() {
    const file = fs.readFileSync(this.path, "utf8");
    this.products = JSON.parse(file);
    if (!this.products) this.products = [];
    return this.products;
  }

  getProductsById(id) {
    this.getProducts();
    let Found = this.products.find((product) => product.id === id);
    if (!Found) {
      console.log("Product Not Found");
      return null;
    }
    return Found;
  }

  updateProduct(id, new_data) {
    this.getProducts();
    let updateProd = this.getProductsById(id);
    if (updateProd != null) {
      // Gets the keys of the object to update
      const keys = Object.keys(new_data);
      keys.forEach((key) => {
        if (key != "id") updateProd[key] = new_data[key];
      });
      this.__writeToFile();
    }
  }

  deleteProduct(id) {
    this.getProducts();
    let index_found = this.products.findIndex((product) => product.id === id);
    if (index_found > -1) {
      this.products.splice(index_found, 1);
      this.__writeToFile();
      return true;
    }
    return false;
  }
}

export default ProductManager;
