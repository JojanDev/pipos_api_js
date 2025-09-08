import express from "express";

import {
  validarServicioVenta,
  validarServicioVentaParcial,
} from "../middlewares/entities/serviciosVentas/servicioVentaValidator.js";
import ServicioVentaController from "../controllers/ServicioVentaController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get(
  "/",
  authorize("servicio-venta.read"),
  ServicioVentaController.getAllServiciosVentas
);

// Obtener un tipo de documento por ID
router.get(
  "/venta/:id",
  authorize("servicio-venta.read"),
  ServicioVentaController.getAllServicioVentaByVentaId
);

// Obtener un tipo de documento por ID
router.get(
  "/:id",
  authorize("servicio-venta.read"),
  ServicioVentaController.getServicioVentaById
);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("servicio-venta.create"),
  validarServicioVenta,
  ServicioVentaController.createServicioVenta
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("servicio-venta.update"),
  validarServicioVenta,
  ServicioVentaController.updateServicioVenta
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("servicio-venta.update"),
  validarServicioVentaParcial,
  ServicioVentaController.updateServicioVenta
);

// Eliminar un tipo de documento
router.delete(
  "/:id",
  authorize("servicio-venta.delete"),
  ServicioVentaController.deleteServicioVenta
);

export default router;
