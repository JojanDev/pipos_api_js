import express from "express";

import {
  validarEspecie,
  validarEspecieParcial,
} from "../middlewares/entities/especies/especieValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import EspecieController from "../controllers/EspecieController.js";

const router = express.Router();

// Obtener todas las especies
router.get("/", authorize("especie.read"), EspecieController.getAllEspecies);

// Obtener una especie por ID
router.get("/:id", authorize("especie.read"), EspecieController.getEspecieById);

// Crear una especie
router.post(
  "/",
  authorize("especie.create"),
  validarEspecie,
  EspecieController.createEspecie
);

// Actualizar una especie (completo)
router.put(
  "/:id",
  authorize("especie.update"),
  validarEspecie,
  EspecieController.updateEspecie
);

// Actualizar una especie (parcial)
router.patch(
  "/:id",
  authorize("especie.update"),
  validarEspecieParcial,
  EspecieController.updateEspecie
);

// Eliminar una especie
router.delete(
  "/:id",
  authorize("especie.delete"),
  EspecieController.deleteEspecie
);

export default router;
