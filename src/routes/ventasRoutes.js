import express from "express";

import {
  validarVenta,
  validarVentaParcial,
} from "../middlewares/entities/ventas/ventaValidator.js";
import VentaController from "../controllers/VentaController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todas las ventas
router.get("/", authorize("venta.read"), VentaController.getAllVentas);

// Obtener una venta por ID
router.get("/:id", authorize("venta.read"), VentaController.getVentaById);

// Crear una venta
router.post(
  "/",
  authorize("venta.create"),
  validarVenta,
  VentaController.createVenta
);

// Actualizar una venta (completo)
router.put(
  "/:id",
  authorize("venta.update"),
  validarVenta,
  VentaController.updateVenta
);

// Actualizar una venta (parcial)
router.patch(
  "/:id",
  authorize("venta.update"),
  validarVentaParcial,
  VentaController.updateVenta
);

// Eliminar una venta
router.delete("/:id", authorize("venta.delete"), VentaController.deleteVenta);

export default router;
