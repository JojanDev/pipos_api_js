import express from "express";

import {
  validarUsuarioVenta,
  validarUsuarioVentaParcial,
} from "../middlewares/entities/usuariosVentas/usuarioVentaValidator.js";
import UsuarioVentaController from "../controllers/UsuarioVentaController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", UsuarioVentaController.getAllUsuariosVentas);

// Obtener un tipo de documento por ID
router.get("/:id", UsuarioVentaController.getUsuarioVentaById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  validarUsuarioVenta,
  UsuarioVentaController.createUsuarioVenta
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  validarUsuarioVenta,
  UsuarioVentaController.updateUsuarioVenta
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarUsuarioVentaParcial,
  UsuarioVentaController.updateUsuarioVenta
);

// Eliminar un tipo de documento
router.delete("/:id", UsuarioVentaController.deleteUsuarioVenta);

export default router;
