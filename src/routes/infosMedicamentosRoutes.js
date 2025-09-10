import express from "express";
import {
  validarInfoMedicamento,
  validarInfoMedicamentoParcial,
} from "../middlewares/entities/infosMedicamentos/infoMedicamentoValidator.js";
import InfoMedicamentoController from "../controllers/InfoMedicamentoController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los registros de información de medicamentos
router.get(
  "/",
  authorize("info-medicamento.read"),
  InfoMedicamentoController.getAllInfosMedicamentos
);

// Obtener información de medicamento por ID
router.get(
  "/:id",
  authorize("info-medicamento.read"),
  InfoMedicamentoController.getInfoMedicamentoById
);

// Crear nueva información de medicamento
router.post(
  "/",
  authorize("info-medicamento.create"),
  validarInfoMedicamento,
  InfoMedicamentoController.createInfoMedicamento
);

// Actualizar información de medicamento (completo)
router.put(
  "/:id",
  authorize("info-medicamento.update"),
  validarInfoMedicamento,
  InfoMedicamentoController.updateInfoMedicamento
);

// Actualizar información de medicamento (parcial)
router.patch(
  "/:id",
  authorize("info-medicamento.update"),
  validarInfoMedicamentoParcial,
  InfoMedicamentoController.updateInfoMedicamento
);

// Eliminar información de medicamento
router.delete(
  "/:id",
  authorize("info-medicamento.delete"),
  InfoMedicamentoController.deleteInfoMedicamento
);

export default router;
