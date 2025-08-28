import express from "express";

import {
  validarElemento,
  validarElementoParcial,
} from "../middlewares/entities/elementos/elementoValidator.js";
import ElementoController from "../controllers/ElementoController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", ElementoController.getAllElementos);

// Obtener un tipo de documento por ID
router.get("/:id", ElementoController.getElementoById);

// Crear un nuevo tipo de documento
router.post("/", validarElemento, ElementoController.createElemento);

// Actualizar un tipo de documento
router.put("/:id", validarElemento, ElementoController.updateElemento);

// Actualizar un tipo de documento parcialmente
router.patch("/:id", validarElementoParcial, ElementoController.updateElemento);

// Eliminar un tipo de documento
router.delete("/:id", ElementoController.deleteElemento);

export default router;
