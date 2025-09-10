import express from "express";
import {
  validarPermisoRol,
  validarPermisoRolParcial,
} from "../middlewares/entities/permisosRoles/permisoRolValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import PermisoRolController from "../controllers/PermisoRolController.js";

const router = express.Router();

// Obtener todos los permisos-roles
router.get(
  "/",
  authorize("permiso-rol.read"),
  PermisoRolController.getAllPermisosRoles
);

// Obtener un permiso-rol por ID
router.get(
  "/:id",
  authorize("permiso-rol.read"),
  PermisoRolController.getPermisoRolById
);

// Crear un permiso-rol
router.post(
  "/",
  authorize("permiso-rol.create"),
  validarPermisoRol,
  PermisoRolController.createPermisoRol
);

// Actualizar un permiso-rol
router.put(
  "/:id",
  authorize("permiso-rol.update"),
  validarPermisoRol,
  PermisoRolController.updatePermisoRol
);

// Actualizar parcialmente un permiso-rol
router.patch(
  "/:id",
  authorize("permiso-rol.update"),
  validarPermisoRolParcial,
  PermisoRolController.updatePermisoRol
);

// Eliminar un permiso-rol
router.delete(
  "/:id",
  authorize("permiso-rol.delete"),
  PermisoRolController.deletePermisoRol
);

export default router;
