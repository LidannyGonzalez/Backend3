// Importa la clase ProductDao desde el archivo correspondiente
import ProductDao from "../Daos/product.dao.js";
// Crea una instancia de ProductDao
const productDao = new ProductDao();

// Importa la clase CartDao desde el archivo correspondiente
import CartDao from "../daos/cart.dao.js";
// Crea una instancia de CartDao
const cartDao = new CartDao();

// Función para crear un nuevo carrito
export const createCart = async () => {
    try {
      // Llama al método createCart de CartDao
      const newcart = await cartDao.createCart();
      // Si no se crea el carrito, retorna false
      if (!newcart) return false;
      // Si se crea el carrito, retorna el carrito nuevo
      else return newcart;
    } catch (error) {
      // Si ocurre un error, lo imprime en la consola
      console.log(error);
    }
};

// Función para obtener todos los carritos
export const getAllCarts = async () => {
  try {
    // Llama al método getAllCarts de CartDao y retorna la lista de carritos
    return await cartDao.getAllCarts();
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola
    console.log(error);
  }
};

// Función para obtener un carrito por su ID
export const getCartById = async (cartId) => {
  try {
    // Llama al método getCartById de CartDao y retorna el carrito correspondiente
    return await cartDao.getCartById(cartId);
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola
    console.log(error);
  }
};

// Función para actualizar un carrito
export const updateCart = async (cartId, obj) => {
  try {
    // Comprueba si el carrito existe llamando a getCartById
    const existCart = await cartDao.getCartById(cartId);
    if (!existCart) throw new Error("Cart not found");
    // Si el carrito existe, lo actualiza y retorna el carrito actualizado
    return await cartDao.updateCart(cartId, obj);
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola
    console.log(error);
  }
};

// Función para eliminar un carrito
export const deleteCart = async (cartId) => {
  try {
    // Llama al método deleteCart de CartDao y guarda el carrito eliminado
    const cartToDelete = await cartDao.deleteCart(cartId);
    // Si no se encuentra el carrito, retorna false
    if (!cartToDelete) return false;
    // Si se encuentra y se elimina, retorna el carrito eliminado
    else return cartToDelete;
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola
    console.log(error);
  }
};

// Función para agregar un producto a un carrito
export const addProductToCart = async (cartId, productId) => {
  try {
    // Comprueba si el carrito existe llamando a getCartById
    const existCart = await cartDao.getCartById(cartId);
    if (!existCart) throw new Error("Cart not found");

    // Comprueba si el producto existe llamando a getProductById
    const existProd = await productDao.getProductById(productId);
    if (!existProd) throw new Error("Product not found");

    // Si ambos existen, agrega el producto al carrito y retorna el carrito actualizado
    return await cartDao.addProductToCart(cartId, productId);
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola
    console.log(error);
  }
};

// Función para remover un producto de un carrito
export const removefromCart = async (cartId, productId) => {
  try {
    // Comprueba si el carrito existe llamando a getCartById
    const existCart = await getCartById(cartId);
    if (!existCart) throw new Error("Cart not found");

    // Comprueba si el producto existe en el carrito llamando a isInCart
    const existProdInCart = await cartDao.isInCart(cartId, productId);
    if (!existProdInCart) throw new Error("Product not found in cart");
    
    // Si ambos existen, remueve el producto del carrito y retorna el carrito actualizado
    return await cartDao.removefromCart(cartId, productId);
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola
    console.log(error);
  }
};

// Función para actualizar la cantidad de un producto en un carrito
export const updateProdQuantity = async (cartId, productId, quantity) => {
  try {
    // Comprueba si el carrito existe llamando a getCartById
    const existCart = await getCartById(cartId);
    if (!existCart) throw new Error("Cart not found");

    // Comprueba si el producto existe en el carrito llamando a isInCart
    const existProdInCart = await cartDao.isInCart(cartId, productId);
    if (!existProdInCart) throw new Error("Product not found in cart");

    // Si ambos existen, actualiza la cantidad del producto en el carrito y retorna el carrito actualizado
    return await cartDao.updateProdQuantity(cartId, productId, quantity);
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola
    console.log(error);
  }
};

// Función para vaciar un carrito
export const clearCart = async (cartId) => {
  try {
    // Comprueba si el carrito existe llamando a getCartById
    const existCart = await getCartById(cartId);
    if (!existCart) throw new Error("Cart not found");

    // Si el carrito existe, lo vacía y retorna el carrito actualizado
    return await cartDao.clearCart(cartId);
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola
    console.log(error);
  }
};
