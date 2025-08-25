import express from "express";

import {
  validarPermisoRol,
  validarPermisoRolParcial,
} from "../middlewares/entities/permisosRoles/permisoRolValidator.js";
import PermisoRolController from "../controllers/PermisoRolController.js";


const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", PermisoRolController.getAllPermisosRoles);

// Obtener un tipo de documento por ID
router.get("/:id", PermisoRolController.getPermisoRolById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  validarPermisoRol,
  PermisoRolController.createPermisoRol
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  validarPermisoRol,
  PermisoRolController.updatePermisoRol
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarPermisoRolParcial,
  PermisoRolController.updatePermisoRol
);

// Eliminar un tipo de documento
router.delete("/:id", PermisoRolController.deletePermisoRol);

export default router;
