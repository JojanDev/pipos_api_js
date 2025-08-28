import express from "express";

import {
  validarCredencial,
  validarCredencialParcial,
} from "../middlewares/entities/credenciales/credencialValidator.js";
import CredencialController from "../controllers/CredencialController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", CredencialController.getAllCredenciales);

// Obtener un tipo de documento por ID
router.get("/:id", CredencialController.getCredencialById);

// Crear un nuevo tipo de documento
router.post("/", validarCredencial, CredencialController.createCredencial);

// Actualizar un tipo de documento
router.put("/:id", validarCredencial, CredencialController.updateCredencial);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarCredencialParcial,
  CredencialController.updateCredencial
);

// Eliminar un tipo de documento
router.delete("/:id", CredencialController.deleteCredencial);

export default router;
