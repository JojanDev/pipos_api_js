import express from "express";

import {
  validarMedicamentoVenta,
  validarMedicamentoVentaParcial,
} from "../middlewares/entities/medicamentosVentas/medicamentoVentaValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import MedicamentoVentaController from "../controllers/MedicamentoVentaController.js";

const router = express.Router();

// Obtener todos los medicamentos en ventas
router.get(
  "/",
  authorize("medicamento-venta.read"),
  MedicamentoVentaController.getAllMedicamentosVentas
);

// Obtener medicamentos por ID de venta
router.get(
  "/venta/:id",
  authorize("medicamento-venta.read"),
  MedicamentoVentaController.getAllMedicamentosVentasByVentaId
);

// Obtener un medicamento en venta por ID
router.get(
  "/:id",
  authorize("medicamento-venta.read"),
  MedicamentoVentaController.getMedicamentoVentaById
);

// Crear medicamento en venta
router.post(
  "/",
  authorize("medicamento-venta.create"),
  validarMedicamentoVenta,
  MedicamentoVentaController.createMedicamentoVenta
);

// Actualizar medicamento en venta (completo)
router.put(
  "/:id",
  authorize("medicamento-venta.update"),
  validarMedicamentoVenta,
  MedicamentoVentaController.updateMedicamentoVenta
);

// Actualizar medicamento en venta (parcial)
router.patch(
  "/:id",
  authorize("medicamento-venta.update"),
  validarMedicamentoVentaParcial,
  MedicamentoVentaController.updateMedicamentoVenta
);

// Eliminar medicamento en venta
router.delete(
  "/:id",
  authorize("medicamento-venta.delete"),
  MedicamentoVentaController.deleteMedicamentoVenta
);

export default router;
