import express from "express";

import {
  validarProducto,
  validarProductoParcial,
} from "../middlewares/entities/productos/productoValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import ProductoController from "../controllers/ProductoController.js";

const router = express.Router();

// Obtener todos los productos
router.get("/", authorize("producto.read"), ProductoController.getAllProductos);

// Obtener productos con stock positivo
router.get(
  "/stock",
  authorize("producto.read"),
  ProductoController.getAllProductosByStockPositivo
);

// Obtener un producto por ID
router.get(
  "/:id",
  authorize("producto.read"),
  ProductoController.getProductoById
);

// Crear un producto
router.post(
  "/",
  authorize("producto.create"),
  validarProducto,
  ProductoController.createProducto
);

// Actualizar un producto (completo)
router.put(
  "/:id",
  authorize("producto.update"),
  validarProducto,
  ProductoController.updateProducto
);

// Actualizar un producto (parcial)
router.patch(
  "/:id",
  authorize("producto.update"),
  validarProductoParcial,
  ProductoController.updateProducto
);

// Eliminar un producto
router.delete(
  "/:id",
  authorize("producto.delete"),
  ProductoController.deleteProducto
);

export default router;
