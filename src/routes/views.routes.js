// routes/views.routes.js
import { Router } from "express";
import * as productService from "../services/product.services.js";

const router = Router();

const generateLink = (url, page, limit, title, sort) => {
  let link = `${url}?page=${page}`;
  if (limit) link += `&limit=${limit}`;
  if (title) link += `&title=${title}`;
  if (sort) link += `&sort=${sort}`;
  return link;
};

router.get("/", async (req, res, next) => {
  try {
    const { page = 1, limit = 10, title, sort } = req.query;
    const response = await productService.getAllProducts(page, limit, title, sort);
    const products = response.docs ? response.docs : [];
    const url = 'http://localhost:8080/';
    const nextLink = response.hasNextPage ? generateLink(url, response.nextPage, limit, title, sort) : null;
    const prevLink = response.hasPrevPage ? generateLink(url, response.prevPage, limit, title, sort) : null;

    res.render("home", {
      products,
      page: response.page,
      hasNextPage: response.hasNextPage,
      hasPrevPage: response.hasPrevPage,
      nextLink,
      prevLink
    });
  } catch (error) {
    console.error("Error al renderizar ❌", error);
    next(error);
  }
});

export default router; // Exporta el enrutador por defecto
