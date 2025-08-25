import express from "express";

import {
  validarRol,
  validarRolParcial,
} from "../middlewares/entities/roles/rolValidator.js";
import RolController from "../controllers/RolController.js";


const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", RolController.getAllRoles);

// Obtener un tipo de documento por ID
router.get("/:id", RolController.getRolById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  validarRol,
  RolController.createRol
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  validarRol,
  RolController.updateRol
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarRolParcial,
  RolController.updateRol
);

// Eliminar un tipo de documento
router.delete("/:id", RolController.deleteRol);

export default router;
