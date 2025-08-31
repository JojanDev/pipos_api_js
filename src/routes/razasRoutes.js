import express from "express";

import {
  validarRaza,
  validarRazaParcial,
} from "../middlewares/entities/razas/razaValidator.js";
import RazaController from "../controllers/RazaController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", RazaController.getAllRazas);

router.get("/especie/:especie_id", RazaController.getAllRazasByEspecieId);

// Obtener un tipo de documento por ID
router.get("/:id", RazaController.getRazaById);

// Crear un nuevo tipo de documento
router.post("/", validarRaza, RazaController.createRaza);

// Actualizar un tipo de documento
router.put("/:id", validarRaza, RazaController.updateRaza);

// Actualizar un tipo de documento parcialmente
router.patch("/:id", validarRazaParcial, RazaController.updateRaza);

// Eliminar un tipo de documento
router.delete("/:id", RazaController.deleteRaza);

export default router;
