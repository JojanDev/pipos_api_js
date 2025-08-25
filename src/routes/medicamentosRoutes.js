import express from "express";

import {
  validarMedicamento,
  validarMedicamentoParcial,
} from "../middlewares/entities/medicamentos/medicamentoValidator.js";
import MedicamentoController from "../controllers/MedicamentoController.js";


const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", MedicamentoController.getAllMedicamentos);

// Obtener un tipo de documento por ID
router.get("/:id", MedicamentoController.getMedicamentoById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  validarMedicamento,
  MedicamentoController.createMedicamento
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  validarMedicamento,
  MedicamentoController.updateMedicamento
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarMedicamentoParcial,
  MedicamentoController.updateMedicamento
);

// Eliminar un tipo de documento
router.delete("/:id", MedicamentoController.deleteMedicamento);

export default router;
