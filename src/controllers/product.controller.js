import * as productService from "../services/product.services.js"; // Importación de los servicios de producto desde product.services.js

// Controlador para obtener todos los productos con paginación, filtrado y ordenamiento
export const getAllProducts = async (req, res, next) => {
  try {
    const { page, limit, title, sort } = req.query; // Obtiene parámetros de consulta: página, límite, título y orden
    const response = await productService.getAllProducts(page, limit, title, sort); // Llama al servicio para obtener productos

    const url = 'http://localhost:8080/api/products'; // URL base para la paginación

    // Genera enlaces para la paginación
    const nextLink = response.hasNextPage ? generateLinks(url, response.nextPage, limit, title, sort) : null;
    const prevLink = response.hasPrevPage ? generateLinks(url, response.prevPage, limit, title, sort) : null;

    // Responde con los datos de los productos paginados y los enlaces de paginación
    res.status(200).json({
      status: 'success',
      payload: response.docs, // Documentos (productos) de la página actual
      totalPages: response.totalDocs, // Total de documentos (productos) en total
      prevPage: response.prevPage, // Página previa
      nextPage: response.nextPage, // Página siguiente
      page, // Página actual
      hasNextPage: response.hasNextPage, // Indica si hay una página siguiente
      hasPrevPage: response.hasPrevPage, // Indica si hay una página previa
      prevLink, // Enlace para la página previa
      nextLink // Enlace para la página siguiente
    });
  } catch (error) {
    next(error.message); // Manejo de errores: llama al siguiente middleware de manejo de errores
  }
};

// Función para generar enlaces de paginación
const generateLinks = (url, page, limit, title, sort) => {
  let link = `${url}?page=${page}`; // Inicia el enlace con la página especificada
  if (limit) link += `&limit=${limit}`; // Agrega el límite al enlace si está definido
  if (title) link += `&title=${title}`; // Agrega el título al enlace si está definido
  if (sort) link += `&sort=${sort}`; // Agrega el orden al enlace si está definido
  return link; // Retorna el enlace generado
};

// Controlador para obtener un producto por su ID
export const getProductById = async (req, res, next) => {
  try {
    const { pid } = req.params; // Obtiene el ID del producto desde los parámetros de la ruta
    const response = await productService.getProductById(pid); // Llama al servicio para obtener el producto por su ID
    if (!response) res.status(404).json({ msg: `cannot find product ${pid} 🚫` }); // Si no se encuentra el producto, responde con un mensaje de error
    else res.status(200).json(response); // Si se encuentra el producto, responde con el producto encontrado
  } catch (error) {
    next(error.message); // Manejo de errores: llama al siguiente middleware de manejo de errores
  }
};

// Controlador para crear un nuevo producto
export const createProduct = async (req, res, next) => {
  try {
    const newProduct = await productService.createProduct(req.body); // Llama al servicio para crear un nuevo producto con los datos recibidos
    if (!newProduct) res.status(404).json({ msg: "cannot create product 🚫" }); // Si no se puede crear el producto, responde con un mensaje de error
    else res.status(200).json(newProduct); // Si se crea correctamente el producto, responde con el producto creado
  } catch (error) {
    next(error.message); // Manejo de errores: llama al siguiente middleware de manejo de errores
  }
};

// Controlador para actualizar un producto por su ID
export const updateProduct = async (req, res, next) => {
  try {
    const { pid } = req.params; // Obtiene el ID del producto desde los parámetros de la ruta
    const productUpdate = await productService.updateProduct(pid, req.body); // Llama al servicio para actualizar el producto con los datos recibidos
    if (!productUpdate) res.status(404).json({ msg: "cannot update product 🚫" }); // Si no se puede actualizar el producto, responde con un mensaje de error
    else res.status(200).json(productUpdate); // Si se actualiza correctamente el producto, responde con el producto actualizado
  } catch (error) {
    next(error.message); // Manejo de errores: llama al siguiente middleware de manejo de errores
  }
};

// Controlador para eliminar un producto por su ID
export const deleteProduct = async (req, res, next) => {
  try {
    const { pid } = req.params; // Obtiene el ID del producto desde los parámetros de la ruta
    const productToDelete = await productService.deleteProduct(pid); // Llama al servicio para eliminar el producto por su ID
    if (!productToDelete) res.status(404).json({ msg: "cannot delete product 🚫 " }); // Si no se puede eliminar el producto, responde con un mensaje de error
    else res.status(200).json({ msg: `The Product id: ${pid} was deleted ✅` }); // Si se elimina correctamente el producto, responde con un mensaje de éxito
  } catch (error) {
    next(error.message); // Manejo de errores: llama al siguiente middleware de manejo de errores
  }
};
