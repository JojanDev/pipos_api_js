import express from "express";

import {
  validarMedicamentoVenta,
  validarMedicamentoVentaParcial,
} from "../middlewares/entities/medicamentosVentas/medicamentoVentaValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import MedicamentoVentaController from "../controllers/MedicamentoVentaController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get(
  "/",
  authorize("medicamento-venta.read"),
  MedicamentoVentaController.getAllMedicamentosVentas
);

// Obtener un tipo de documento por ID
router.get(
  "/venta/:id",
  authorize("medicamento-venta.read"),
  MedicamentoVentaController.getAllMedicamentosVentasByVentaId
);

// Obtener un tipo de documento por ID
router.get(
  "/:id",
  authorize("medicamento-venta.read"),
  MedicamentoVentaController.getMedicamentoVentaById
);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("medicamento-venta.create"),
  validarMedicamentoVenta,
  MedicamentoVentaController.createMedicamentoVenta
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("medicamento-venta.update"),
  validarMedicamentoVenta,
  MedicamentoVentaController.updateMedicamentoVenta
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("medicamento-venta.update"),
  validarMedicamentoVentaParcial,
  MedicamentoVentaController.updateMedicamentoVenta
);

// Eliminar un tipo de documento
router.delete(
  "/:id",
  authorize("medicamento-venta.delete"),
  MedicamentoVentaController.deleteMedicamentoVenta
);

export default router;
