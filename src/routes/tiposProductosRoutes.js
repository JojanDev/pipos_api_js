import express from "express";

import {
  validarTipoProducto,
  validarTipoProductoParcial,
} from "../middlewares/entities/tiposProductos/tipoProductoValidator.js";
import TipoProductoController from "../controllers/TipoProductoController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", TipoProductoController.getAllTiposProductos);

// Obtener un tipo de documento por ID
router.get("/:id", TipoProductoController.getTipoProductoById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  validarTipoProducto,
  TipoProductoController.createTipoProducto
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  validarTipoProducto,
  TipoProductoController.updateTipoProducto
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarTipoProductoParcial,
  TipoProductoController.updateTipoProducto
);

// Eliminar un tipo de documento
router.delete("/:id", TipoProductoController.deleteTipoProducto);

export default router;
