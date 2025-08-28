import express from "express";

import {
  validarInfoMedicamento,
  validarInfoMedicamentoParcial,
} from "../middlewares/entities/infosMedicamentos/infoMedicamentoValidator.js";
import InfoMedicamentoController from "../controllers/InfoMedicamentoController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", InfoMedicamentoController.getAllInfosMedicamentos);

// Obtener un tipo de documento por ID
router.get("/:id", InfoMedicamentoController.getInfoMedicamentoById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  validarInfoMedicamento,
  InfoMedicamentoController.createInfoMedicamento
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  validarInfoMedicamento,
  InfoMedicamentoController.updateInfoMedicamento
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarInfoMedicamentoParcial,
  InfoMedicamentoController.updateInfoMedicamento
);

// Eliminar un tipo de documento
router.delete("/:id", InfoMedicamentoController.deleteInfoMedicamento);

export default router;
