import express from "express";

import {
  validarInfoMedicamento,
  validarInfoMedicamentoParcial,
} from "../middlewares/entities/infosMedicamentos/infoMedicamentoValidator.js";
import InfoMedicamentoController from "../controllers/InfoMedicamentoController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get(
  "/",
  authorize("info-medicamento.read"),
  InfoMedicamentoController.getAllInfosMedicamentos
);

// Obtener un tipo de documento por ID
router.get(
  "/:id",
  authorize("info-medicamento.read"),
  InfoMedicamentoController.getInfoMedicamentoById
);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("info-medicamento.create"),
  validarInfoMedicamento,
  InfoMedicamentoController.createInfoMedicamento
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("info-medicamento.update"),
  validarInfoMedicamento,
  InfoMedicamentoController.updateInfoMedicamento
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("info-medicamento.update"),
  validarInfoMedicamentoParcial,
  InfoMedicamentoController.updateInfoMedicamento
);

// Eliminar un tipo de documento
router.delete(
  "/:id",
  authorize("info-medicamento.delete"),
  InfoMedicamentoController.deleteInfoMedicamento
);

export default router;
