import express from "express";

import {
  validarTratamiento,
  validarTratamientoParcial,
} from "../middlewares/entities/tratamientos/antecedenteValidator.js";
import TratamientoController from "../controllers/TratamientoController.js";


const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", TratamientoController.getAllTratamientos);

// Obtener un tipo de documento por ID
router.get("/:id", TratamientoController.getTratamientoById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  validarTratamiento,
  TratamientoController.createTratamiento
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  validarTratamiento,
  TratamientoController.updateTratamiento
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarTratamientoParcial,
  TratamientoController.updateTratamiento
);

// Eliminar un tipo de documento
router.delete("/:id", TratamientoController.deleteTratamiento);

export default router;
