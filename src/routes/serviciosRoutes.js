import express from "express";

import {
  validarServicio,
  validarServicioParcial,
} from "../middlewares/entities/servicios/servicioValidator.js";
import ServicioController from "../controllers/ServicioController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los servicios
router.get("/", authorize("servicio.read"), ServicioController.getAllServicios);

// Obtener un servicio por ID
router.get(
  "/:id",
  authorize("servicio.read"),
  ServicioController.getServicioById
);

// Crear un servicio
router.post(
  "/",
  authorize("servicio.create"),
  validarServicio,
  ServicioController.createServicio
);

// Actualizar un servicio (completo)
router.put(
  "/:id",
  authorize("servicio.update"),
  validarServicio,
  ServicioController.updateServicio
);

// Actualizar un servicio (parcial)
router.patch(
  "/:id",
  authorize("servicio.update"),
  validarServicioParcial,
  ServicioController.updateServicio
);

// Eliminar un servicio
router.delete(
  "/:id",
  authorize("servicio.delete"),
  ServicioController.deleteServicio
);

export default router;
