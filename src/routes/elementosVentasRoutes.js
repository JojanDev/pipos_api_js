import express from "express";

import {
  validarElementoVenta,
  validarElementoVentaParcial,
} from "../middlewares/entities/elementosVentas/elementoVentaValidator.js";
import ElementoVentaController from "../controllers/ElementoVentaController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", ElementoVentaController.getAllElementosVentas);

// Obtener un tipo de documento por ID
router.get("/:id", ElementoVentaController.getElementoVentaById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  validarElementoVenta,
  ElementoVentaController.createElementoVenta
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  validarElementoVenta,
  ElementoVentaController.updateElementoVenta
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarElementoVentaParcial,
  ElementoVentaController.updateElementoVenta
);

// Eliminar un tipo de documento
router.delete("/:id", ElementoVentaController.deleteElementoVenta);

export default router;
