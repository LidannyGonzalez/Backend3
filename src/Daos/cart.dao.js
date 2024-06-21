import { CartModel } from "../Daos/models/cart.model.js"; // Importación del modelo CartModel desde cart.model.js

export default class CartDao {
  // Método para crear un nuevo carrito vacío
  async createCart() {
    try {
      return await CartModel.create({
        products: [], // Inicialmente el carrito se crea sin productos
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Método para obtener todos los carritos existentes
  async getAllCarts() {
    try {
      return await CartModel.find({}); // Retorna todos los documentos de la colección carts
    } catch (error) {
      console.log(error);
    }
  }

  // Método para obtener un carrito por su ID, populando los productos con sus detalles
  async getCartById(id) {
    try {
      return await CartModel.findById(id).populate("products.product");
      // findById busca un carrito por su ID y populate llena los detalles de productos referenciados
    } catch (error) {
      console.log(error);
    }
  }

  // Método para actualizar un carrito por su ID
  async updateCart(id, obj) {
    try {
      const response = await CartModel.findByIdAndUpdate(id, obj, {
        new: true, // Retorna el documento actualizado
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // Método para eliminar un carrito por su ID
  async deleteCart(id) {
    try {
      return await CartModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }

  // Método para verificar si un producto ya está en un carrito
  async isInCart(cartId, productId) {
    try {
      return await CartModel.findOne({
        _id: cartId,
        products: { $elemMatch: { product: productId } }, // Busca un producto específico en el carrito
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  // Método para agregar un producto a un carrito
  async addProductToCart(cartId, productId) {
    try {
      const prodInCart = await this.isInCart(cartId, productId); // Verifica si el producto ya está en el carrito
      if (prodInCart) {
        // Si el producto ya está en el carrito, incrementa su cantidad
        return await CartModel.findOneAndUpdate(
          { _id: cartId, 'products.product': productId }, // Encuentra el producto dentro del carrito
          { $set: { 'products.$.quantity': prodInCart.products[0].quantity + 1 } }, // Incrementa la cantidad
          { new: true } // Retorna el carrito actualizado
        );
      } else {
        // Si el producto no está en el carrito, lo añade
        return await CartModel.findByIdAndUpdate(
          cartId,
          { $push: { products: { product: productId } } }, // Añade el producto al array de productos del carrito
          { new: true } // Retorna el carrito actualizado
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Método para remover un producto de un carrito
  async removefromCart(cartId, productId) {
    try {
      return await CartModel.findByIdAndUpdate(
        { _id: cartId },
        { $pull: { products: { product: productId } } }, // Elimina el producto del array de productos del carrito
        { new: true } // Retorna el carrito actualizado
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Método para actualizar la cantidad de un producto en un carrito
  async updateProdQuantity(cartId, productId, quantity) {
    try {
      return await CartModel.findOneAndUpdate(
        { _id: cartId, 'products.product': productId }, // Encuentra el producto dentro del carrito
        { $set: { 'products.$.quantity': quantity } }, // Actualiza la cantidad del producto
        { new: true } // Retorna el carrito actualizado
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Método para limpiar un carrito (eliminar todos los productos)
  async clearCart(cartId) {
    try {
      return await CartModel.findOneAndUpdate(
        { _id: cartId },
        { $set: { products: [] } }, // Vacía el array de productos del carrito
        { new: true } // Retorna el carrito actualizado
      );
    } catch (error) {
      console.log(error);
    }
  }
}
