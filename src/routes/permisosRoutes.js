import express from "express";

import {
  validarPermiso,
  validarPermisoParcial,
} from "../middlewares/entities/permisos/permisoValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import PermisoController from "../controllers/PermisoController.js";

const router = express.Router();

// Obtener todos los permisos
router.get("/", authorize("permiso.read"), PermisoController.getAllPermisos);

// Obtener un permiso por ID
router.get("/:id", authorize("permiso.read"), PermisoController.getPermisoById);

// Crear un permiso
router.post(
  "/",
  authorize("permiso.create"),
  validarPermiso,
  PermisoController.createPermiso
);

// Actualizar un permiso (completo)
router.put(
  "/:id",
  authorize("permiso.update"),
  validarPermiso,
  PermisoController.updatePermiso
);

// Actualizar un permiso (parcial)
router.patch(
  "/:id",
  authorize("permiso.update"),
  validarPermisoParcial,
  PermisoController.updatePermiso
);

// Eliminar un permiso
router.delete(
  "/:id",
  authorize("permiso.delete"),
  PermisoController.deletePermiso
);

export default router;
