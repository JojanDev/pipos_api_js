import express from "express";

import {
  validarPermisoRol,
  validarPermisoRolParcial,
} from "../middlewares/entities/permisosRoles/permisoRolValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import PermisoRolController from "../controllers/PermisoRolController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get(
  "/",
  authorize("permiso-rol.read"),
  PermisoRolController.getAllPermisosRoles
);

// Obtener un tipo de documento por ID
router.get(
  "/:id",
  authorize("permiso-rol.read"),
  PermisoRolController.getPermisoRolById
);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("permiso-rol.create"),
  validarPermisoRol,
  PermisoRolController.createPermisoRol
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("permiso-rol.update"),
  validarPermisoRol,
  PermisoRolController.updatePermisoRol
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("permiso-rol.update"),
  validarPermisoRolParcial,
  PermisoRolController.updatePermisoRol
);

// Eliminar un tipo de documento
router.delete(
  "/:id",
  authorize("permiso-rol.delete"),
  PermisoRolController.deletePermisoRol
);

export default router;
