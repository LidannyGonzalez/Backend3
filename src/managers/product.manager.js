import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async createProduct(obj) {
    try {
        const product = {
            id: uuidv4(),
            status: true,
            ...obj,
        };
        const productFile = await this.getProducts();
        const productExist = productFile.find((u) => u.title === product.title);
        if (productExist) {
          console.log("error: el producto ya existe");
          return "El producto ya existe";
        }
        if (product.title === "" || product.description === "" || product.price <= 0 || product.code === "" || product.stock <= 0 || product.category === "" ) {
            throw new Error("title, description, price, code, stock, category: todos los campos son obligatorios");
        }
        productFile.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(productFile, null, "\t"));
        return product;
    } catch (error) {
        console.log(error);
    }
}


  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(products);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const productExist = products.find((p) => p.id === id);
      if (!productExist) return null;
      return productExist;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(obj, id) {
    try {
      const products = await this.getProducts();
      let productExist = await this.getProductById(id);
      if (!productExist) return null;
      productExist = { ...productExist, ...obj };
      const newArray = products.filter((u) => u.id !== id);
      newArray.push(productExist);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, "\t"));
      return productExist;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      if (products.length > 0) {
        const productExist = await this.getProductById(id);
        if (productExist) {
          const newArray = products.filter((u) => u.id !== id);
          await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, "\t"));
          return productExist;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFile() {
    try {
      await fs.promises.unlink(this.path);
      console.log("archivo eliminado");
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductManager;
