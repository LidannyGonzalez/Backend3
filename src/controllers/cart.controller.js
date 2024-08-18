import * as service from '../services/cart.services.js'
import { getProductById, updateProduct } from '../services/product.services.js';
import { getUserByEmail } from '../services/user.services.js';
import { createTicket } from '../services/ticket.services.js';
import { resTicketDto } from '../dtos/ticket.dto.js';
import { v4 as uuidv4 } from 'uuid';

// Crear un nuevo carrito

export const createCart = async (req, res, next) => {
    try {
      const newCart = await service.createCart();
      if (!newCart) res.status(404).json({ msg: "No se pudo crear el carrito" });
      else res.status(200).json(newCart);
    } catch (error) {
      next(error.message);
    }
  };

  // Obtener todos los carritos

export const getAllCarts = async (req, res, next) => {
    try {
      const response = await service.getAllCarts();
      res.status(200).json(response);
    } catch (error) {
      next(error.message);
    }
  };
  
  // Obtener carrito por ID

  export const getCartById = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const response = await service.getCartById(cid);
      if (!response) res.status(404).json({ msg: "Carrito no encontrado" });
      else res.status(200).json(response);
    } catch (error) {
      next(error.message);
    }
  };
  
  // Actualizar carrito

  export const updateCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const cartUpd = await service.updateCart(cid, req.body);
      if (!cartUpd) res.status(404).json({ msg: "Error al actualizar el carrito" });
      else res.status(200).json(cartUpd);
    } catch (error) {
      next(error.message);
    }
  };
  
  // Eliminar carrito

  export const deleteCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const cartDel = await service.deleteCart(cid);
      if (!cartDel) res.status(404).json({ msg: "No se pudo eliminar el carrito" });
      else res.status(200).json({ msg: `Carrito id: ${cid} eliminado` });
    } catch (error) {
      next(error.message);
    }
  };

  // Agregar producto al carrito

export const addProductToCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { pid } = req.params;
      const ProductToAdd = await service.addProductToCart(cid,pid);
      if (!ProductToAdd) res.json({ msg: "Error al agregar producto" });
      else res.json(ProductToAdd);
    } catch (error) {
      next(error.message);
    }
  };

  // Eliminar producto del carrito

  export const removefromCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { pid } = req.params;
      const delProdToUserCart = await service.removefromCart(cid,pid);
      if (!delProdToUserCart) res.json({ msg: "No se pudo eliminar el producto del carrito" });
      else res.json({msg: `Producto ${pid} eliminado del carrito`});
    } catch (error) {
      next(error.message);
    }
  };

  // Actualizar cantidad de producto en el carrito

  export const updateProdQuantity = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { pid } = req.params;
      const { quantity } = req.body;
      const  updateProdQuantity = await service.updateProdQuantity(
        cid,
        pid,
        quantity
      );
      if (!updateProdQuantity) res.json({ msg: "No se pudo actualizar la cantidad del producto" });
      else res.json(updateProdQuantity);
    } catch (error) {
      next(error.message);
    }
  };

  // Vaciar carrito

  export const clearCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const clearCart = await service.clearCart(cid);
      if (!clearCart) res.json({ msg: "No se pudo vaciar el carrito" });
      else res.json(clearCart);
    } catch (error) {
      next(error.message);
    }
  };

  // Realizar compra

  export const purchase = async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await service.getCartById(cid);

        if (!cart) {
            return res.status(400).send("Carrito no encontrado");
        }

        let ticketProducts = [];
        let productsOutOfStock = [];
        let TotalPurchase = 0;

        for (const product of cart.products) {
            try {
                const dbProduct = await getProductById(product.product);

                if (dbProduct) {
                    if (product.quantity <= dbProduct.stock) {
                        await updateProduct(product.product, { stock: dbProduct.stock - product.quantity });
                        ticketProducts.push(product);
                        TotalPurchase += product.quantity * dbProduct.price;
                        await service.removefromCart(cid, product.product._id);
                    } else {
                        productsOutOfStock.push(product);
                    }
                } else {
                    productsOutOfStock.push(product);
                }
            } catch (error) {
                console.error(`Error al procesar el producto ${item.product}:`, error);
                productsOutOfStock.push(product);
            }
        }

        const purchaseUser = await getUserByEmail(req.user.email);

        if (!purchaseUser) {
            return res.status(400).send("Usuario no Encontrado");
        }

        const code = uuidv4();

        const ticket = {
            code: code,
            amount: TotalPurchase,
            purchaser: req.user.email,
            purchaserId: purchaseUser[0]._id
        };

        const ticketResponse = await createTicket(ticket);

        if (ticketResponse) {
            return res.status(200).json({ ticket: resTicketDto(ticketResponse[0]), ticketProducts: ticketProducts, productOutOfStock: productsOutOfStock });
        } else {
            return res.status(400).send("No se pudo generar el ticket");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });
    }
};
