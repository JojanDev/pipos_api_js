import express from "express";

import {
  validarRolUsuario,
  validarRolUsuarioParcial,
} from "../middlewares/entities/rolesUsuarios/rolUsuarioValidator.js";
import RolUsuarioController from "../controllers/RolUsuarioController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", RolUsuarioController.getAllRolesUsuarios);

router.get("/usuario/:id", RolUsuarioController.getAllRolesUsuarioByUsuarioId);

// Obtener un tipo de documento por ID
router.get("/:id", RolUsuarioController.getRolUsuarioById);

// Crear un nuevo tipo de documento
router.post("/", validarRolUsuario, RolUsuarioController.createRolUsuario);

// Actualizar un tipo de documento
router.put("/:id", validarRolUsuario, RolUsuarioController.updateRolUsuario);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarRolUsuarioParcial,
  RolUsuarioController.updateRolUsuario
);

// Eliminar un tipo de documento
router.delete("/:id", RolUsuarioController.deleteRolUsuario);

export default router;
