import express from "express";

import {
  validarServicio,
  validarServicioParcial,
} from "../middlewares/entities/servicios/servicioValidator.js";
import ServicioController from "../controllers/ServicioController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", authorize("servicio.read"), ServicioController.getAllServicios);

// Obtener un tipo de documento por ID
router.get(
  "/:id",
  authorize("servicio.read"),
  ServicioController.getServicioById
);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("servicio.create"),
  validarServicio,
  ServicioController.createServicio
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("servicio.update"),
  validarServicio,
  ServicioController.updateServicio
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("servicio.update"),
  validarServicioParcial,
  ServicioController.updateServicio
);

// Eliminar un tipo de documento
router.delete(
  "/:id",
  authorize("servicio.delete"),
  ServicioController.deleteServicio
);

export default router;
