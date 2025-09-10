import express from "express";
import {
  validarAntecedente,
  validarAntecedenteParcial,
} from "../middlewares/entities/antecedentes/antecedenteValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import AntecedenteController from "../controllers/AntecedenteController.js";

const router = express.Router();

// Obtener todos los antecedentes
router.get(
  "/",
  authorize("antecedente.read"),
  AntecedenteController.getAllAntecedentes
);

// Obtener antecedentes de una mascota
router.get(
  "/mascota/:id",
  authorize("antecedente.read"),
  AntecedenteController.getAllAntecedentesByMascotaId
);

// Obtener un antecedente por ID
router.get(
  "/:id",
  authorize("antecedente.read"),
  AntecedenteController.getAntecedenteById
);

// Crear un antecedente
router.post(
  "/",
  authorize("antecedente.create"),
  validarAntecedente,
  AntecedenteController.createAntecedente
);

// Actualizar un antecedente completo
router.put(
  "/:id",
  authorize("antecedente.update"),
  validarAntecedente,
  AntecedenteController.updateAntecedente
);

// Actualizar un antecedente parcialmente
router.patch(
  "/:id",
  authorize("antecedente.update"),
  validarAntecedenteParcial,
  AntecedenteController.updateAntecedente
);

// Eliminar un antecedente
router.delete(
  "/:id",
  authorize("antecedente.delete"),
  AntecedenteController.deleteAntecedente
);

export default router;
