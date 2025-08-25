import express from "express";

import {
  validarPermiso,
  validarPermisoParcial,
} from "../middlewares/entities/permisos/permisoValidator.js";
import PermisoController from "../controllers/PermisoController.js";


const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", PermisoController.getAllPermisos);

// Obtener un tipo de documento por ID
router.get("/:id", PermisoController.getPermisoById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  validarPermiso,
  PermisoController.createPermiso
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  validarPermiso,
  PermisoController.updatePermiso
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarPermisoParcial,
  PermisoController.updatePermiso
);

// Eliminar un tipo de documento
router.delete("/:id", PermisoController.deletePermiso);

export default router;
