import express from "express";

import {
  validarProducto,
  validarProductoParcial,
} from "../middlewares/entities/productos/productoValidator.js";
import ProductoController from "../controllers/ProductoController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", ProductoController.getAllProductos);

// Obtener un tipo de documento por ID
router.get("/:id", ProductoController.getProductoById);

// Crear un nuevo tipo de documento
router.post("/", validarProducto, ProductoController.createProducto);

// Actualizar un tipo de documento
router.put("/:id", validarProducto, ProductoController.updateProducto);

// Actualizar un tipo de documento parcialmente
router.patch("/:id", validarProductoParcial, ProductoController.updateProducto);

// Eliminar un tipo de documento
router.delete("/:id", ProductoController.deleteProducto);

export default router;
