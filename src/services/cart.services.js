import ProductDao from "../Daos/product.dao.js";
const productDao = new ProductDao();

import CartDao from "../daos/cart.dao.js";
const cartDao = new CartDao();

export const createCart = async () => {
    try {
      const newcart = await cartDao.createCart();
      if (!newcart) return false;
      else return newcart;
    } catch (error) {
      console.log(error);
    }
};

export const getAllCarts = async () => {
  try {
    return await cartDao.getAllCarts();
  } catch (error) {
    console.log(error);
  }
};


export const getCartById = async (cartId) => {
  try {
    return await cartDao.getCartById(cartId);
  } catch (error) {
    console.log(error);
  }
};


export const updateCart = async (cartId, obj) => {
  try {
    const existCart = await cartDao.getCartById(cartId);
    if (!existCart) throw new Error("Carrito no encontrado");
    return await cartDao.updateCart(cartId, obj);
  } catch (error) {
    console.log(error);
  }
};


export const deleteCart = async (cartId) => {
  try {
    const cartToDelete = await cartDao.deleteCart(cartId);
    if (!cartToDelete) return false;

    else return cartToDelete;
  } catch (error) {

    console.log(error);
  }
};


export const addProductToCart = async (cartId, productId) => {
  try {

    const existCart = await cartDao.getCartById(cartId);
    if (!existCart) throw new Error("Carrito no encontrado");

    const existProd = await productDao.getProductById(productId);
    if (!existProd) throw new Error("Producto no encontrado");

    return await cartDao.addProductToCart(cartId, productId);
  } catch (error) {
    console.log(error);
  }
};

export const removefromCart = async (cartId, productId) => {
  try {

    const existCart = await getCartById(cartId);
    if (!existCart) throw new Error("Carrito no encontrado");


    const existProdInCart = await cartDao.isInCart(cartId, productId);
    if (!existProdInCart) throw new Error("Producto no encontrado en el carrito");
    
    return await cartDao.removefromCart(cartId, productId);
  } catch (error) {
    console.log(error);
  }
};

export const updateProdQuantity = async (cartId, productId, quantity) => {
  try {

    const existCart = await getCartById(cartId);
    if (!existCart) throw new Error("Carrito no encontrado");

    const existProdInCart = await cartDao.isInCart(cartId, productId);
    if (!existProdInCart) throw new Error("Producto no encontrado en el carrito");

    return await cartDao.updateProdQuantity(cartId, productId, quantity);
  } catch (error) {
    console.log(error);
  }
};

export const clearCart = async (cartId) => {
  try {
    const existCart = await getCartById(cartId);
    if (!existCart) throw new Error("Carrito no encontrado");

    return await cartDao.clearCart(cartId);
  } catch (error) {
    console.log(error);
  }
};
