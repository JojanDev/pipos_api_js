import express from "express";

import {
  validarTipoProducto,
  validarTipoProductoParcial,
} from "../middlewares/entities/tiposProductos/tipoProductoValidator.js";
import TipoProductoController from "../controllers/TipoProductoController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los tipos de producto
router.get(
  "/",
  authorize("tipo-producto.read"),
  TipoProductoController.getAllTiposProductos
);

// Obtener tipo de producto por ID
router.get(
  "/:id",
  authorize("tipo-producto.read"),
  TipoProductoController.getTipoProductoById
);

// Crear tipo de producto
router.post(
  "/",
  authorize("tipo-producto.create"),
  validarTipoProducto,
  TipoProductoController.createTipoProducto
);

// Actualizar tipo de producto (completo)
router.put(
  "/:id",
  authorize("tipo-producto.update"),
  validarTipoProducto,
  TipoProductoController.updateTipoProducto
);

// Actualizar tipo de producto (parcial)
router.patch(
  "/:id",
  authorize("tipo-producto.update"),
  validarTipoProductoParcial,
  TipoProductoController.updateTipoProducto
);

// Eliminar tipo de producto
router.delete(
  "/:id",
  authorize("tipo-producto.delete"),
  TipoProductoController.deleteTipoProducto
);

export default router;
