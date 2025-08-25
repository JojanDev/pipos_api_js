import express from "express";

import {
  validarDetalleVenta,
  validarDetalleVentaParcial,
} from "../middlewares/entities/detallesVentas/antecedenteValidator.js";
import DetalleVentaController from "../controllers/DetalleVentaController.js";


const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", DetalleVentaController.getAllDetallesVentas);

// Obtener un tipo de documento por ID
router.get("/:id", DetalleVentaController.getDetalleVentaById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  validarDetalleVenta,
  DetalleVentaController.createDetalleVenta
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  validarDetalleVenta,
  DetalleVentaController.updateDetalleVenta
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarDetalleVentaParcial,
  DetalleVentaController.updateDetalleVenta
);

// Eliminar un tipo de documento
router.delete("/:id", DetalleVentaController.deleteDetalleVenta);

export default router;
