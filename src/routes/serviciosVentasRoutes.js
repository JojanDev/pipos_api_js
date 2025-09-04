import express from "express";

import {
  validarServicioVenta,
  validarServicioVentaParcial,
} from "../middlewares/entities/serviciosVentas/servicioVentaValidator.js";
import ServicioVentaController from "../controllers/ServicioVentaController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", ServicioVentaController.getAllServiciosVentas);

// Obtener un tipo de documento por ID
router.get("/venta/:id", ServicioVentaController.getAllServicioVentaByVentaId);

// Obtener un tipo de documento por ID
router.get("/:id", ServicioVentaController.getServicioVentaById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  validarServicioVenta,
  ServicioVentaController.createServicioVenta
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  validarServicioVenta,
  ServicioVentaController.updateServicioVenta
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarServicioVentaParcial,
  ServicioVentaController.updateServicioVenta
);

// Eliminar un tipo de documento
router.delete("/:id", ServicioVentaController.deleteServicioVenta);

export default router;
