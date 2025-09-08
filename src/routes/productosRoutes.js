import express from "express";

import {
  validarProducto,
  validarProductoParcial,
} from "../middlewares/entities/productos/productoValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import ProductoController from "../controllers/ProductoController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", authorize("producto.read"), ProductoController.getAllProductos);

// Obtener un tipo de documento por ID
router.get(
  "/:id",
  authorize("producto.read"),
  ProductoController.getProductoById
);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("producto.create"),
  validarProducto,
  ProductoController.createProducto
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("producto.update"),
  validarProducto,
  ProductoController.updateProducto
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("producto.update"),
  validarProductoParcial,
  ProductoController.updateProducto
);

// Eliminar un tipo de documento
router.delete(
  "/:id",
  authorize("producto.delete"),
  ProductoController.deleteProducto
);

export default router;
