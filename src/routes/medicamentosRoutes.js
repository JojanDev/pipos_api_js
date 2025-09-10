import express from "express";
import {
  validarMedicamento,
  validarMedicamentoParcial,
} from "../middlewares/entities/medicamentos/medicamentoValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import MedicamentoController from "../controllers/MedicamentoController.js";

const router = express.Router();

// Obtener todos los medicamentos
router.get(
  "/",
  authorize("medicamento.read"),
  MedicamentoController.getAllMedicamentos
);

// Obtener medicamentos con stock positivo
router.get(
  "/stock",
  authorize("medicamento.read"),
  MedicamentoController.getAllMedicamentosByCantidadPositiva
);

// Obtener un medicamento por ID
router.get(
  "/:id",
  authorize("medicamento.read"),
  MedicamentoController.getMedicamentoById
);

// Crear un medicamento
router.post(
  "/",
  authorize("medicamento.create"),
  validarMedicamento,
  MedicamentoController.createMedicamento
);

// Actualizar un medicamento
router.put(
  "/:id",
  authorize("medicamento.update"),
  validarMedicamento,
  MedicamentoController.updateMedicamento
);

// Actualizar parcialmente un medicamento
router.patch(
  "/:id",
  authorize("medicamento.update"),
  validarMedicamentoParcial,
  MedicamentoController.updateMedicamento
);

// Eliminar un medicamento
router.delete(
  "/:id",
  authorize("medicamento.delete"),
  MedicamentoController.deleteMedicamento
);

export default router;
