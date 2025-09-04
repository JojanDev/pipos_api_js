import express from "express";

import {
  validarProductoVenta,
  validarProductoVentaParcial,
} from "../middlewares/entities/productosVentas/productoVentaValidator.js";
import ProductoVentaController from "../controllers/ProductoVentaController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", ProductoVentaController.getAllProductosVentas);

// Obtener un tipo de documento por ID
router.get("/venta/:id", ProductoVentaController.getAllProductoVentaByVentaId);

// Obtener un tipo de documento por ID
router.get("/:id", ProductoVentaController.getProductoVentaById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  validarProductoVenta,
  ProductoVentaController.createProductoVenta
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  validarProductoVenta,
  ProductoVentaController.updateProductoVenta
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarProductoVentaParcial,
  ProductoVentaController.updateProductoVenta
);

// Eliminar un tipo de documento
router.delete("/:id", ProductoVentaController.deleteProductoVenta);

export default router;
