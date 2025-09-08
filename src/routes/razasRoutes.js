import express from "express";

import {
  validarRaza,
  validarRazaParcial,
} from "../middlewares/entities/razas/razaValidator.js";
import RazaController from "../controllers/RazaController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", authorize("raza.read"), RazaController.getAllRazas);

router.get(
  "/especie/:especie_id",
  authorize("raza.read"),
  RazaController.getAllRazasByEspecieId
);

// Obtener un tipo de documento por ID
router.get("/:id", authorize("raza.read"), RazaController.getRazaById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("raza.create"),
  validarRaza,
  RazaController.createRaza
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("raza.update"),
  validarRaza,
  RazaController.updateRaza
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("raza.update"),
  validarRazaParcial,
  RazaController.updateRaza
);

// Eliminar un tipo de documento
router.delete("/:id", authorize("raza.delete"), RazaController.deleteRaza);

export default router;
