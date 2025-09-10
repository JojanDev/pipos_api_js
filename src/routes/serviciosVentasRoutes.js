import express from "express";

import {
  validarServicioVenta,
  validarServicioVentaParcial,
} from "../middlewares/entities/serviciosVentas/servicioVentaValidator.js";
import ServicioVentaController from "../controllers/ServicioVentaController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los servicios en ventas
router.get(
  "/",
  authorize("servicio-venta.read"),
  ServicioVentaController.getAllServiciosVentas
);

// Obtener servicios por ID de venta
router.get(
  "/venta/:id",
  authorize("servicio-venta.read"),
  ServicioVentaController.getAllServicioVentaByVentaId
);

// Obtener un servicio en venta por ID
router.get(
  "/:id",
  authorize("servicio-venta.read"),
  ServicioVentaController.getServicioVentaById
);

// Crear servicio en venta
router.post(
  "/",
  authorize("servicio-venta.create"),
  validarServicioVenta,
  ServicioVentaController.createServicioVenta
);

// Actualizar servicio en venta (completo)
router.put(
  "/:id",
  authorize("servicio-venta.update"),
  validarServicioVenta,
  ServicioVentaController.updateServicioVenta
);

// Actualizar servicio en venta (parcial)
router.patch(
  "/:id",
  authorize("servicio-venta.update"),
  validarServicioVentaParcial,
  ServicioVentaController.updateServicioVenta
);

// Eliminar servicio en venta
router.delete(
  "/:id",
  authorize("servicio-venta.delete"),
  ServicioVentaController.deleteServicioVenta
);

export default router;
