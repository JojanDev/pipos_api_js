import express from "express";

import {
  validarPermiso,
  validarPermisoParcial,
} from "../middlewares/entities/permisos/permisoValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import PermisoController from "../controllers/PermisoController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", authorize("permiso.read"), PermisoController.getAllPermisos);

// Obtener un tipo de documento por ID
router.get("/:id", authorize("permiso.read"), PermisoController.getPermisoById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("permiso.create"),
  validarPermiso,
  PermisoController.createPermiso
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("permiso.update"),
  validarPermiso,
  PermisoController.updatePermiso
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("permiso.update"),
  validarPermisoParcial,
  PermisoController.updatePermiso
);

// Eliminar un tipo de documento
router.delete(
  "/:id",
  authorize("permiso.delete"),
  PermisoController.deletePermiso
);

export default router;
