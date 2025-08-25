import express from "express";

import {
  validarAntecedente,
  validarAntecedenteParcial,
} from "../middlewares/entities/antecedentes/antecedenteValidator.js";
import AntecedenteController from "../controllers/AntecedenteController.js";


const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", AntecedenteController.getAllAntecedentes);

// Obtener un tipo de documento por ID
router.get("/:id", AntecedenteController.getAntecedenteById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  validarAntecedente,
  AntecedenteController.createAntecedente
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  validarAntecedente,
  AntecedenteController.updateAntecedente
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarAntecedenteParcial,
  AntecedenteController.updateAntecedente
);

// Eliminar un tipo de documento
router.delete("/:id", AntecedenteController.deleteAntecedente);

export default router;
