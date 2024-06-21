// Importa la clase ProductDao desde el archivo correspondiente
import ProductDao from "../Daos/product.dao.js";

// Crea una instancia de ProductDao
const productDao = new ProductDao();

/**
 * Función para obtener todos los productos.
 * @param {number} page - Número de página.
 * @param {number} limit - Límite de productos por página.
 * @param {string} title - Título del producto (opcional).
 * @param {string} sort - Orden de los productos (asc o desc).
 * @returns {Promise<object>} - Lista de productos.
 */
export const getAllProducts = async (page, limit, title, sort) => {
  try {
    // Llama al método getAllProducts de ProductDao y retorna los productos
    return await productDao.getAllProducts(page, limit, title, sort);
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola
    console.log(error);
  }
};

/**
 * Función para obtener un producto por su ID.
 * @param {string} id - ID del producto.
 * @returns {Promise<object|boolean>} - Producto encontrado o false si no se encuentra.
 */
export const getProductById = async (id) => {
  try {
    // Llama al método getProductById de ProductDao y guarda el producto encontrado
    const foundProduct = await productDao.getProductById(id);
    // Si no se encuentra el producto, retorna false
    if (!foundProduct) return false;
    // Si se encuentra el producto, lo retorna
    else return foundProduct;
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola
    console.log(error);
  }
};

/**
 * Función para crear un nuevo producto.
 * @param {object} obj - Objeto con los datos del nuevo producto.
 * @returns {Promise<object|boolean>} - Producto creado o false si no se puede crear.
 */
export const createProduct = async (obj) => {
  try {
    // Llama al método createProduct de ProductDao y guarda el producto nuevo
    const newProduct = await productDao.createProduct(obj);
    // Si no se puede crear el producto, retorna false
    if (!newProduct) return false;
    // Si se crea el producto, lo retorna
    else return newProduct;
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola
    console.log(error);
  }
};

/**
 * Función para actualizar un producto existente.
 * @param {string} id - ID del producto a actualizar.
 * @param {object} obj - Objeto con los nuevos datos del producto.
 * @returns {Promise<object|boolean>} - Producto actualizado o false si no se puede actualizar.
 */
export const updateProduct = async (id, obj) => {
  try {
    // Llama al método updateProduct de ProductDao y guarda el producto actualizado
    const productUpdate = await productDao.updateProduct(id, obj);
    // Si no se puede actualizar el producto, retorna false
    if (!productUpdate) return false;
    // Si se actualiza el producto, lo retorna
    else return productUpdate;
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola
    console.log(error);
  }
};

/**
 * Función para eliminar un producto por su ID.
 * @param {string} id - ID del producto a eliminar.
 * @returns {Promise<object|boolean>} - Producto eliminado o false si no se puede eliminar.
 */
export const deleteProduct = async (id) => {
  try {
    // Llama al método deleteProduct de ProductDao y guarda el producto eliminado
    const productToDelete = await productDao.deleteProduct(id);
    // Si no se puede eliminar el producto, retorna false
    if (!productToDelete) return false;
    // Si se elimina el producto, lo retorna
    else return productToDelete;
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola
    console.log(error);
  }
};
