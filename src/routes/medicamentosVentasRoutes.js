import express from "express";

import {
  validarMedicamentoVenta,
  validarMedicamentoVentaParcial,
} from "../middlewares/entities/medicamentosVentas/medicamentoVentaValidator.js";
import MedicamentoVentaController from "../controllers/MedicamentoVentaController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", MedicamentoVentaController.getAllMedicamentosVentas);

// Obtener un tipo de documento por ID
router.get(
  "/venta/:id",
  MedicamentoVentaController.getAllMedicamentosVentasByVentaId
);

// Obtener un tipo de documento por ID
router.get("/:id", MedicamentoVentaController.getMedicamentoVentaById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  validarMedicamentoVenta,
  MedicamentoVentaController.createMedicamentoVenta
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  validarMedicamentoVenta,
  MedicamentoVentaController.updateMedicamentoVenta
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarMedicamentoVentaParcial,
  MedicamentoVentaController.updateMedicamentoVenta
);

// Eliminar un tipo de documento
router.delete("/:id", MedicamentoVentaController.deleteMedicamentoVenta);

export default router;
