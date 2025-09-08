import express from "express";

import {
  validarProductoVenta,
  validarProductoVentaParcial,
} from "../middlewares/entities/productosVentas/productoVentaValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import ProductoVentaController from "../controllers/ProductoVentaController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get(
  "/",
  authorize("producto-venta.read"),
  ProductoVentaController.getAllProductosVentas
);

// Obtener un tipo de documento por ID
router.get(
  "/venta/:id",
  authorize("producto-venta.read"),
  ProductoVentaController.getAllProductoVentaByVentaId
);

// Obtener un tipo de documento por ID
router.get(
  "/:id",
  authorize("producto-venta.read"),
  ProductoVentaController.getProductoVentaById
);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("producto-venta.create"),
  validarProductoVenta,
  ProductoVentaController.createProductoVenta
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("producto-venta.update"),
  validarProductoVenta,
  ProductoVentaController.updateProductoVenta
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("producto-venta.update"),
  validarProductoVentaParcial,
  ProductoVentaController.updateProductoVenta
);

// Eliminar un tipo de documento
router.delete(
  "/:id",
  authorize("producto-venta.delete"),
  ProductoVentaController.deleteProductoVenta
);

export default router;
