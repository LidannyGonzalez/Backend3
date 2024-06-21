import { Schema, model } from "mongoose"; // Importación de Schema y model desde Mongoose
import mongoosePaginate from "mongoose-paginate-v2"; // Plugin de paginación para Mongoose

export const productcolection = "products"; // Nombre de la colección en la base de datos

// Definición del esquema de producto
const productSchema = new Schema({
  title: { type: String, required: true }, // Título del producto (obligatorio)
  description: { type: String, required: true }, // Descripción del producto (obligatoria)
  code: { type: String, required: true, unique: true }, // Código único del producto (obligatorio y único)
  price: { type: Number, required: true }, // Precio del producto (obligatorio)
  stock: { type: Number, required: true }, // Stock disponible del producto (obligatorio)
  category: { type: String, required: true, index: true }, // Categoría del producto (obligatoria, índice para búsqueda rápida)
});

productSchema.plugin(mongoosePaginate); // Aplicación del plugin de paginación a productSchema

// Creación del modelo 'ProductModel' basado en el esquema 'productSchema'
export const ProductModel = model(productcolection, productSchema);

