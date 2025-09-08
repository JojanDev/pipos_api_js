import express from "express";

import {
  validarRol,
  validarRolParcial,
} from "../middlewares/entities/roles/rolValidator.js";
import RolController from "../controllers/RolController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", authorize("rol.read"), RolController.getAllRoles);

// Obtener un tipo de documento por ID
router.get("/:id", authorize("rol.read"), RolController.getRolById);

// Crear un nuevo tipo de documento
router.post("/", authorize("rol.create"), validarRol, RolController.createRol);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("rol.update"),
  validarRol,
  RolController.updateRol
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("rol.update"),
  validarRolParcial,
  RolController.updateRol
);

// Eliminar un tipo de documento
router.delete("/:id", authorize("rol.delete"), RolController.deleteRol);

export default router;
