import express from "express";

import {
  validarTratamiento,
  validarTratamientoParcial,
} from "../middlewares/entities/tratamientos/tratamientoValidator.js";
import TratamientoController from "../controllers/TratamientoController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get(
  "/",
  authorize("tratamiento.read"),
  TratamientoController.getAllTratamientos
);

router.get(
  "/antecedente/:id",
  authorize("tratamiento.read"),
  TratamientoController.getAllTratamientosByAntecedenteId
);

// Obtener un tipo de documento por ID
router.get(
  "/:id",
  authorize("tratamiento.read"),
  TratamientoController.getTratamientoById
);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("tratamiento.create"),
  validarTratamiento,
  TratamientoController.createTratamiento
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("tratamiento.update"),
  validarTratamiento,
  TratamientoController.updateTratamiento
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("tratamiento.update"),
  validarTratamientoParcial,
  TratamientoController.updateTratamiento
);

// Eliminar un tipo de documento
router.delete(
  "/:id",
  authorize("tratamiento.delete"),
  TratamientoController.deleteTratamiento
);

export default router;
