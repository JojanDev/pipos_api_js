import express from "express";

import {
  validarRolUsuario,
  validarRolUsuarioParcial,
} from "../middlewares/entities/rolesUsuarios/rolUsuarioValidator.js";
import RolUsuarioController from "../controllers/RolUsuarioController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todas las relaciones rol-usuario
router.get(
  "/",
  authorize("rol-usuario.read"),
  RolUsuarioController.getAllRolesUsuarios
);

// Obtener relaciones rol-usuario de un usuario
router.get(
  "/usuario/:id",
  authorize("rol-usuario.read"),
  RolUsuarioController.getAllRolesUsuarioByUsuarioId
);

// Obtener una relación rol-usuario por ID
router.get(
  "/:id",
  authorize("rol-usuario.read"),
  RolUsuarioController.getRolUsuarioById
);

// Crear una relación rol-usuario
router.post(
  "/",
  authorize("rol-usuario.create"),
  validarRolUsuario,
  RolUsuarioController.createRolUsuario
);

// Actualizar una relación rol-usuario
router.put(
  "/:id",
  authorize("rol-usuario.update"),
  validarRolUsuario,
  RolUsuarioController.updateRolUsuario
);

// Actualizar parcialmente una relación rol-usuario
router.patch(
  "/:id",
  authorize("rol-usuario.update"),
  validarRolUsuarioParcial,
  RolUsuarioController.updateRolUsuario
);

// Eliminar una relación rol-usuario
router.delete(
  "/:id",
  authorize("rol-usuario.delete"),
  RolUsuarioController.deleteRolUsuario
);

export default router;
