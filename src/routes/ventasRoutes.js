import express from "express";

import {
  validarVenta,
  validarVentaParcial,
} from "../middlewares/entities/ventas/ventaValidator.js";
import VentaController from "../controllers/VentaController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", authorize("venta.read"), VentaController.getAllVentas);

// Obtener un tipo de documento por ID
router.get("/:id", authorize("venta.read"), VentaController.getVentaById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("venta.create"),
  validarVenta,
  VentaController.createVenta
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("venta.update"),
  validarVenta,
  VentaController.updateVenta
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("venta.update"),
  validarVentaParcial,
  VentaController.updateVenta
);

// Eliminar un tipo de documento
router.delete("/:id", authorize("venta.delete"), VentaController.deleteVenta);

export default router;
