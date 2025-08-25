import express from "express";

import {
  validarVenta,
  validarVentaParcial,
} from "../middlewares/entities/ventas/ventaValidator.js";
import VentaController from "../controllers/VentaController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", VentaController.getAllVentas);

// Obtener un tipo de documento por ID
router.get("/:id", VentaController.getVentaById);

// Crear un nuevo tipo de documento
router.post("/", validarVenta, VentaController.createVenta);

// Actualizar un tipo de documento
router.put("/:id", validarVenta, VentaController.updateVenta);

// Actualizar un tipo de documento parcialmente
router.patch("/:id", validarVentaParcial, VentaController.updateVenta);

// Eliminar un tipo de documento
router.delete("/:id", VentaController.deleteVenta);

export default router;
