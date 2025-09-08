import express from "express";

import {
  validarMedicamento,
  validarMedicamentoParcial,
} from "../middlewares/entities/medicamentos/medicamentoValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import MedicamentoController from "../controllers/MedicamentoController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get(
  "/",
  authorize("medicamento.read"),
  MedicamentoController.getAllMedicamentos
);

// Obtener un tipo de documento por ID
router.get(
  "/:id",
  authorize("medicamento.read"),
  MedicamentoController.getMedicamentoById
);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("medicamento.create"),
  validarMedicamento,
  MedicamentoController.createMedicamento
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("medicamento.update"),
  validarMedicamento,
  MedicamentoController.updateMedicamento
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("medicamento.update"),
  validarMedicamentoParcial,
  MedicamentoController.updateMedicamento
);

// Eliminar un tipo de documento
router.delete(
  "/:id",
  authorize("medicamento.delete"),
  MedicamentoController.deleteMedicamento
);

export default router;
