import express from "express";

import {
  validarEspecie,
  validarEspecieParcial,
} from "../middlewares/entities/especies/especieValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import EspecieController from "../controllers/EspecieController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", authorize("especie.read"), EspecieController.getAllEspecies);

// Obtener un tipo de documento por ID
router.get("/:id", authorize("especie.read"), EspecieController.getEspecieById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("especie.create"),
  validarEspecie,
  EspecieController.createEspecie
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("especie.update"),
  validarEspecie,
  EspecieController.updateEspecie
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("especie.update"),
  validarEspecieParcial,
  EspecieController.updateEspecie
);

// Eliminar un tipo de documento
router.delete(
  "/:id",
  authorize("especie.delete"),
  EspecieController.deleteEspecie
);

export default router;
