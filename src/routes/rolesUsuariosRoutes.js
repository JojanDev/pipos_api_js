import express from "express";

import {
  validarRolUsuario,
  validarRolUsuarioParcial,
} from "../middlewares/entities/rolesUsuarios/rolUsuarioValidator.js";
import RolUsuarioController from "../controllers/RolUsuarioController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get(
  "/",
  authorize("rol-usuario.read"),
  RolUsuarioController.getAllRolesUsuarios
);

router.get(
  "/usuario/:id",
  authorize("rol-usuario.read"),
  RolUsuarioController.getAllRolesUsuarioByUsuarioId
);

// Obtener un tipo de documento por ID
router.get(
  "/:id",
  authorize("rol-usuario.read"),
  RolUsuarioController.getRolUsuarioById
);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("rol-usuario.create"),
  validarRolUsuario,
  RolUsuarioController.createRolUsuario
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("rol-usuario.update"),
  validarRolUsuario,
  RolUsuarioController.updateRolUsuario
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("rol-usuario.update"),
  validarRolUsuarioParcial,
  RolUsuarioController.updateRolUsuario
);

// Eliminar un tipo de documento
router.delete(
  "/:id",
  authorize("rol-usuario.delete"),
  RolUsuarioController.deleteRolUsuario
);

export default router;
