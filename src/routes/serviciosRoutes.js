import express from "express";

import {
  validarServicio,
  validarServicioParcial,
} from "../middlewares/entities/servicios/servicioValidator.js";
import ServicioController from "../controllers/ServicioController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", ServicioController.getAllServicios);

// Obtener un tipo de documento por ID
router.get("/:id", ServicioController.getServicioById);

// Crear un nuevo tipo de documento
router.post("/", validarServicio, ServicioController.createServicio);

// Actualizar un tipo de documento
router.put("/:id", validarServicio, ServicioController.updateServicio);

// Actualizar un tipo de documento parcialmente
router.patch("/:id", validarServicioParcial, ServicioController.updateServicio);

// Eliminar un tipo de documento
router.delete("/:id", ServicioController.deleteServicio);

export default router;
