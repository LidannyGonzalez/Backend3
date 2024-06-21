import { ProductModel } from "./models/product.model.js"; // Importación del modelo ProductModel desde product.model.js

export default class ProductDao {
  // Método para obtener todos los productos con paginación, filtrado y ordenamiento
  async getAllProducts(page = 1, limit = 10, title, sort) {
    try {
      const filter = title ? { 'title': title } : {}; // Aplica un filtro por título si está definido
      let sortOrder = {};
      if (sort) {
        sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null; // Determina el orden ascendente o descendente por precio
      }
      const response = await ProductModel.paginate(filter, { page, limit, sort: sortOrder }); // Realiza la consulta paginada
      return response; // Retorna la respuesta paginada
    } catch (error) {
      console.log(error); // Manejo de errores: registra el error en la consola
    }
  }

  // Método para obtener un producto por su ID
  async getProductById(id) {
    try {
      const response = await ProductModel.findById(id); // Busca un producto por su ID
      return response; // Retorna el producto encontrado
    } catch (error) {
      console.log(error); // Manejo de errores: registra el error en la consola
    }
  }

  // Método para crear un nuevo producto
  async createProduct(obj) {
    try {
      const response = await ProductModel.create(obj); // Crea un nuevo producto en la base de datos
      return response; // Retorna el producto creado
    } catch (error) {
      console.log(error); // Manejo de errores: registra el error en la consola
    }
  }

  // Método para actualizar un producto por su ID
  async updateProduct(id, obj) {
    try {
      const response = await ProductModel.findByIdAndUpdate(id, obj, {
        new: true, // Retorna el producto actualizado
      });
      return response; // Retorna el producto actualizado
    } catch (error) {
      console.log(error); // Manejo de errores: registra el error en la consola
    }
  }

  // Método para eliminar un producto por su ID
  async deleteProduct(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id); // Elimina un producto por su ID
      return response; // Retorna el producto eliminado
    } catch (error) {
      console.log(error); // Manejo de errores: registra el error en la consola
    }
  }
}
