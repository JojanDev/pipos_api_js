import express from "express";

import {
  validarRol,
  validarRolParcial,
} from "../middlewares/entities/roles/rolValidator.js";
import RolController from "../controllers/RolController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los roles
router.get("/", authorize("rol.read"), RolController.getAllRoles);

// Obtener roles asignables a empleados
router.get(
  "/empleados",
  authorize("rol.read"),
  RolController.getAllRolesEmpleados
);

// Obtener un rol por ID
router.get("/:id", authorize("rol.read"), RolController.getRolById);

// Crear un rol
router.post("/", authorize("rol.create"), validarRol, RolController.createRol);

// Actualizar un rol (completo)
router.put(
  "/:id",
  authorize("rol.update"),
  validarRol,
  RolController.updateRol
);

// Actualizar un rol (parcial)
router.patch(
  "/:id",
  authorize("rol.update"),
  validarRolParcial,
  RolController.updateRol
);

// Eliminar un rol
router.delete("/:id", authorize("rol.delete"), RolController.deleteRol);

export default router;
