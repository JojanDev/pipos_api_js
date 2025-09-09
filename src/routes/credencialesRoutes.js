import express from "express";

import {
  validarCredencial,
  validarCredencialParcial,
} from "../middlewares/entities/credenciales/credencialValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import CredencialController from "../controllers/CredencialController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get(
  "/",
  authorize("credencial.read"),
  CredencialController.getAllCredenciales
);

router.get(
  "/nickname/:usuario",
  authorize("credencial.read"),
  CredencialController.getCredencialByUsuario
);

// Obtener un tipo de documento por ID
router.get(
  "/usuario/:id",
  authorize("credencial.read"),
  CredencialController.getCredencialByUsuarioId
);

// Obtener un tipo de documento por ID
router.get(
  "/:id",
  authorize("credencial.read"),
  CredencialController.getCredencialById
);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("credencial.create"),
  validarCredencial,
  CredencialController.createCredencial
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("credencial.update"),
  validarCredencial,
  CredencialController.updateCredencial
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("credencial.update"),
  validarCredencialParcial,
  CredencialController.updateCredencial
);

// Eliminar un tipo de documento
router.delete("/:id", CredencialController.deleteCredencial);

export default router;
