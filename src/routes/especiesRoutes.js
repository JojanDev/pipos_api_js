import express from "express";

import {
  validarEspecie,
  validarEspecieParcial,
} from "../middlewares/entities/especies/especieValidator.js";
import EspecieController from "../controllers/EspecieController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", EspecieController.getAllEspecies);

// Obtener un tipo de documento por ID
router.get("/:id", EspecieController.getEspecieById);

// Crear un nuevo tipo de documento
router.post("/", validarEspecie, EspecieController.createEspecie);

// Actualizar un tipo de documento
router.put("/:id", validarEspecie, EspecieController.updateEspecie);

// Actualizar un tipo de documento parcialmente
router.patch("/:id", validarEspecieParcial, EspecieController.updateEspecie);

// Eliminar un tipo de documento
router.delete("/:id", EspecieController.deleteEspecie);

export default router;
