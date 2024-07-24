import { Router } from "express";
import * as cartController from "../controllers/cart.controller.js";

// instancias

const cartRouter = Router();

// rutas para carts

cartRouter.get("/", cartController.getAllCarts)

cartRouter.get("/:cid", cartController.getCartById);

cartRouter.post("/", cartController.createCart);

cartRouter.delete("/:cid/erase", cartController.deleteCart);

cartRouter.put("/:cid", cartController.updateCart);

cartRouter.post("/:cid/product/:pid", cartController.addProductToCart);

cartRouter.delete("/:cid/product/:pid", cartController.removefromCart);

cartRouter.put("/:cid/product/:pid", cartController.updateProdQuantity);

cartRouter.delete("/:cid", cartController.clearCart);

export default cartRouter;