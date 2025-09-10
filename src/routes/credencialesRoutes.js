import express from "express";
import {
  validarCredencial,
  validarCredencialParcial,
} from "../middlewares/entities/credenciales/credencialValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import CredencialController from "../controllers/CredencialController.js";

const router = express.Router();

// Obtener todas las credenciales
router.get(
  "/",
  authorize("credencial.read"),
  CredencialController.getAllCredenciales
);

// Obtener credencial por nickname
router.get(
  "/nickname/:usuario",
  authorize("credencial.read"),
  CredencialController.getCredencialByUsuario
);

// Obtener credencial por ID de usuario
router.get(
  "/usuario/:id",
  authorize("credencial.read"),
  CredencialController.getCredencialByUsuarioId
);

// Obtener credencial por ID
router.get(
  "/:id",
  authorize("credencial.read"),
  CredencialController.getCredencialById
);

// Crear credencial
router.post(
  "/",
  authorize("credencial.create"),
  validarCredencial,
  CredencialController.createCredencial
);

// Actualizar credencial (completo)
router.put(
  "/:id",
  authorize("credencial.update"),
  validarCredencial,
  CredencialController.updateCredencial
);

// Actualizar credencial (parcial)
router.patch(
  "/:id",
  authorize("credencial.update"),
  validarCredencialParcial,
  CredencialController.updateCredencial
);

// Eliminar credencial
router.delete(
  "/:id",
  authorize("credencial.delete"),
  CredencialController.deleteCredencial
);

export default router;
