import express from "express";
import {
  validarProductoVenta,
  validarProductoVentaParcial,
} from "../middlewares/entities/productosVentas/productoVentaValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import ProductoVentaController from "../controllers/ProductoVentaController.js";

const router = express.Router();

// Obtener todos los productos-ventas
router.get(
  "/",
  authorize("producto-venta.read"),
  ProductoVentaController.getAllProductosVentas
);

// Obtener productos-ventas de una venta específica
router.get(
  "/venta/:id",
  authorize("producto-venta.read"),
  ProductoVentaController.getAllProductoVentaByVentaId
);

// Obtener un producto-venta por ID
router.get(
  "/:id",
  authorize("producto-venta.read"),
  ProductoVentaController.getProductoVentaById
);

// Crear un producto-venta
router.post(
  "/",
  authorize("producto-venta.create"),
  validarProductoVenta,
  ProductoVentaController.createProductoVenta
);

// Actualizar un producto-venta
router.put(
  "/:id",
  authorize("producto-venta.update"),
  validarProductoVenta,
  ProductoVentaController.updateProductoVenta
);

// Actualizar parcialmente un producto-venta
router.patch(
  "/:id",
  authorize("producto-venta.update"),
  validarProductoVentaParcial,
  ProductoVentaController.updateProductoVenta
);

// Eliminar un producto-venta
router.delete(
  "/:id",
  authorize("producto-venta.delete"),
  ProductoVentaController.deleteProductoVenta
);

export default router;
