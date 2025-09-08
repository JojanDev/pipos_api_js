import express from "express";

import {
  validarMedicamentoTratamiento,
  validarMedicamentoTratamientoParcial,
} from "../middlewares/entities/medicamentosTratamientos/medicamentoTratamientoValidator.js";
import MedicamentoTratamientoController from "../controllers/MedicamentoTratamientoController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get(
  "/",
  authorize("medicamento-tratamiento.read"),
  MedicamentoTratamientoController.getAllMedicamentosTratamientos
);

router.get(
  "/tratamiento/:id",
  authorize("medicamento-tratamiento.read"),
  MedicamentoTratamientoController.getAllMedicamentosTratamientosByTratamientoId
);

// Obtener un tipo de documento por ID
router.get(
  "/:id",
  authorize("medicamento-tratamiento.read"),
  MedicamentoTratamientoController.getMedicamentoTratamientoById
);

// Crear un nuevo tipo de documento
router.post(
  "/",
  validarMedicamentoTratamiento,
  authorize("medicamento-tratamiento.create"),
  MedicamentoTratamientoController.createMedicamentoTratamiento
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  validarMedicamentoTratamiento,
  authorize("medicamento-tratamiento.update"),
  MedicamentoTratamientoController.updateMedicamentoTratamiento
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarMedicamentoTratamientoParcial,
  authorize("medicamento-tratamiento.update"),
  MedicamentoTratamientoController.updateMedicamentoTratamiento
);

// Eliminar un tipo de documento
router.delete(
  "/:id",
  authorize("medicamento-tratamiento.delete"),
  MedicamentoTratamientoController.deleteMedicamentoTratamiento
);

export default router;
