import express from "express";

import {
  validarMedicamentoTratamiento,
  validarMedicamentoTratamientoParcial,
} from "../middlewares/entities/medicamentosTratamientos/medicamentoTratamientoValidator.js";
import MedicamentoTratamientoController from "../controllers/MedicamentoTratamientoController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get(
  "/",
  MedicamentoTratamientoController.getAllMedicamentosTratamientos
);

router.get(
  "/tratamiento/:id",
  MedicamentoTratamientoController.getAllMedicamentosTratamientosByTratamientoId
);

// Obtener un tipo de documento por ID
router.get(
  "/:id",
  MedicamentoTratamientoController.getMedicamentoTratamientoById
);

// Crear un nuevo tipo de documento
router.post(
  "/",
  validarMedicamentoTratamiento,
  MedicamentoTratamientoController.createMedicamentoTratamiento
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  validarMedicamentoTratamiento,
  MedicamentoTratamientoController.updateMedicamentoTratamiento
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarMedicamentoTratamientoParcial,
  MedicamentoTratamientoController.updateMedicamentoTratamiento
);

// Eliminar un tipo de documento
router.delete(
  "/:id",
  MedicamentoTratamientoController.deleteMedicamentoTratamiento
);

export default router;
