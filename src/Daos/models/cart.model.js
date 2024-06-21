import { Schema, model } from "mongoose"; // Importación de Schema y model desde Mongoose

// Definición del esquema de cart
export const cartSchema = new Schema({
  products: [
    {
      _id: false, // Indica que no se creará un campo _id para cada elemento del array products
      quantity: {
        type: Number,
        default: 1 // Valor por defecto para la cantidad del producto
      },
      product: {
        type: Schema.Types.ObjectId, // Tipo ObjectId que referencia a un documento en la colección 'products'
        ref: "products" // Nombre de la colección referenciada (en este caso, 'products')
      }
    }
  ]
});

// Creación del modelo 'CartModel' basado en el esquema 'cartSchema'
export const CartModel = model("carts", cartSchema);

