import express from "express";

import {
  validarTratamiento,
  validarTratamientoParcial,
} from "../middlewares/entities/tratamientos/tratamientoValidator.js";
import TratamientoController from "../controllers/TratamientoController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los tratamientos
router.get(
  "/",
  authorize("tratamiento.read"),
  TratamientoController.getAllTratamientos
);

// Obtener tratamientos por ID de antecedente
router.get(
  "/antecedente/:id",
  authorize("tratamiento.read"),
  TratamientoController.getAllTratamientosByAntecedenteId
);

// Obtener un tratamiento por ID
router.get(
  "/:id",
  authorize("tratamiento.read"),
  TratamientoController.getTratamientoById
);

// Crear un tratamiento
router.post(
  "/",
  authorize("tratamiento.create"),
  validarTratamiento,
  TratamientoController.createTratamiento
);

// Actualizar un tratamiento (completo)
router.put(
  "/:id",
  authorize("tratamiento.update"),
  validarTratamiento,
  TratamientoController.updateTratamiento
);

// Actualizar un tratamiento (parcial)
router.patch(
  "/:id",
  authorize("tratamiento.update"),
  validarTratamientoParcial,
  TratamientoController.updateTratamiento
);

// Eliminar un tratamiento
router.delete(
  "/:id",
  authorize("tratamiento.delete"),
  TratamientoController.deleteTratamiento
);

export default router;
