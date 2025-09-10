import express from "express";

import {
  validarMedicamentoTratamiento,
  validarMedicamentoTratamientoParcial,
} from "../middlewares/entities/medicamentosTratamientos/medicamentoTratamientoValidator.js";
import MedicamentoTratamientoController from "../controllers/MedicamentoTratamientoController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los medicamentos en tratamientos
router.get(
  "/",
  authorize("medicamento-tratamiento.read"),
  MedicamentoTratamientoController.getAllMedicamentosTratamientos
);

// Obtener medicamentos por ID de tratamiento
router.get(
  "/tratamiento/:id",
  authorize("medicamento-tratamiento.read"),
  MedicamentoTratamientoController.getAllMedicamentosTratamientosByTratamientoId
);

// Obtener un medicamento en tratamiento por ID
router.get(
  "/:id",
  authorize("medicamento-tratamiento.read"),
  MedicamentoTratamientoController.getMedicamentoTratamientoById
);

// Crear medicamento en tratamiento
router.post(
  "/",
  validarMedicamentoTratamiento,
  authorize("medicamento-tratamiento.create"),
  MedicamentoTratamientoController.createMedicamentoTratamiento
);

// Actualizar medicamento en tratamiento (completo)
router.put(
  "/:id",
  validarMedicamentoTratamiento,
  authorize("medicamento-tratamiento.update"),
  MedicamentoTratamientoController.updateMedicamentoTratamiento
);

// Actualizar medicamento en tratamiento (parcial)
router.patch(
  "/:id",
  validarMedicamentoTratamientoParcial,
  authorize("medicamento-tratamiento.update"),
  MedicamentoTratamientoController.updateMedicamentoTratamiento
);

// Eliminar medicamento en tratamiento
router.delete(
  "/:id",
  authorize("medicamento-tratamiento.delete"),
  MedicamentoTratamientoController.deleteMedicamentoTratamiento
);

export default router;
