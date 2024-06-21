import * as service from '../services/cart.services.js';

export const createCart = async (req, res, next) => {
  try {
    const newCart = await service.createCart();
    if (!newCart) {
      res.status(404).json({ msg: "Cannot create cart 🚫" });
    } else {
      res.status(200).json(newCart);
    }
  } catch (error) {
    next(error); // Pasamos el objeto de error completo para que sea manejado por el middleware de errorHandler
  }
};

export const getAllCarts = async (req, res, next) => {
  try {
    const response = await service.getAllCarts();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getCartById = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const response = await service.getCartById(cid);
    if (!response) {
      res.status(404).json({ msg: "Cart not found 🚫" });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cartUpd = await service.updateCart(cid, req.body);
    if (!cartUpd) {
      res.status(404).json({ msg: "Error updating cart 🚫" });
    } else {
      res.status(200).json(cartUpd);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cartDel = await service.deleteCart(cid);
    if (!cartDel) {
      res.status(404).json({ msg: "Cannot delete cart 🚫" });
    } else {
      res.status(200).json({ msg: `Cart id: ${cid} deleted` });
    }
  } catch (error) {
    next(error);
  }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const ProductToAdd = await service.addProductToCart(cid, pid);
    if (!ProductToAdd) {
      res.status(404).json({ msg: "Error adding product 🚫" });
    } else {
      res.status(200).json(ProductToAdd);
    }
  } catch (error) {
    next(error);
  }
};

export const removefromCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const delProdToUserCart = await service.removefromCart(cid, pid);
    if (!delProdToUserCart) {
      res.status(404).json({ msg: "Cannot remove product from cart 🚫" });
    } else {
      res.status(200).json({ msg: `The product ${pid} was removed from cart` });
    }
  } catch (error) {
    next(error);
  }
};

export const updateProdQuantity = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const updatedQuantity = await service.updateProdQuantity(cid, pid, quantity);
    if (!updatedQuantity) {
      res.status(404).json({ msg: "Cannot update product quantity 🚫" });
    } else {
      res.status(200).json(updatedQuantity);
    }
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const clearCartResult = await service.clearCart(cid);
    if (!clearCartResult) {
      res.status(404).json({ msg: "Cannot clear this cart 🚫" });
    } else {
      res.status(200).json(clearCartResult);
    }
  } catch (error) {
    next(error);
  }
};
