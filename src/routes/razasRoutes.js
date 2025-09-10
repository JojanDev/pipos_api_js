import express from "express";

import {
  validarRaza,
  validarRazaParcial,
} from "../middlewares/entities/razas/razaValidator.js";
import RazaController from "../controllers/RazaController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todas las razas
router.get("/", authorize("raza.read"), RazaController.getAllRazas);

// Obtener razas por especie
router.get(
  "/especie/:especie_id",
  authorize("raza.read"),
  RazaController.getAllRazasByEspecieId
);

// Obtener una raza por ID
router.get("/:id", authorize("raza.read"), RazaController.getRazaById);

// Crear una raza
router.post(
  "/",
  authorize("raza.create"),
  validarRaza,
  RazaController.createRaza
);

// Actualizar una raza (completo)
router.put(
  "/:id",
  authorize("raza.update"),
  validarRaza,
  RazaController.updateRaza
);

// Actualizar una raza (parcial)
router.patch(
  "/:id",
  authorize("raza.update"),
  validarRazaParcial,
  RazaController.updateRaza
);

// Eliminar una raza
router.delete("/:id", authorize("raza.delete"), RazaController.deleteRaza);

export default router;
