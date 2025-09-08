import express from "express";

import {
  validarAntecedente,
  validarAntecedenteParcial,
} from "../middlewares/entities/antecedentes/antecedenteValidator.js";
import AntecedenteController from "../controllers/AntecedenteController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get(
  "/",
  authorize("antecedente.read"),
  AntecedenteController.getAllAntecedentes
);

// Obtener un tipo de documento por ID
router.get(
  "/mascota/:id",
  authorize("antecedente.read"),
  AntecedenteController.getAllAntecedentesByMascotaId
);

// Obtener un tipo de documento por ID
router.get(
  "/:id",
  authorize("antecedente.read"),
  AntecedenteController.getAntecedenteById
);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("antecedente.create"),
  validarAntecedente,
  AntecedenteController.createAntecedente
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("antecedente.update"),
  validarAntecedente,
  AntecedenteController.updateAntecedente
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("antecedente.update"),
  validarAntecedenteParcial,
  AntecedenteController.updateAntecedente
);

// Eliminar un tipo de documento
router.delete(
  "/:id",
  authorize("antecedente.delete"),
  AntecedenteController.deleteAntecedente
);

export default router;
