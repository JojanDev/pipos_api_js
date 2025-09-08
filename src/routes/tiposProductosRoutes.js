import express from "express";

import {
  validarTipoProducto,
  validarTipoProductoParcial,
} from "../middlewares/entities/tiposProductos/tipoProductoValidator.js";
import TipoProductoController from "../controllers/TipoProductoController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get(
  "/",
  authorize("tipo-producto.read"),
  TipoProductoController.getAllTiposProductos
);

// Obtener un tipo de documento por ID
router.get(
  "/:id",
  authorize("tipo-producto.read"),
  TipoProductoController.getTipoProductoById
);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("tipo-producto.create"),
  validarTipoProducto,
  TipoProductoController.createTipoProducto
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("tipo-producto.update"),
  validarTipoProducto,
  TipoProductoController.updateTipoProducto
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("tipo-producto.update"),
  validarTipoProductoParcial,
  TipoProductoController.updateTipoProducto
);

// Eliminar un tipo de documento
router.delete(
  "/:id",
  authorize("tipo-producto.delete"),
  TipoProductoController.deleteTipoProducto
);

export default router;
