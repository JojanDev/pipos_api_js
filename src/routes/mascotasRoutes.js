import express from "express";

import {
  validarMascota,
  validarMascotaParcial,
} from "../middlewares/entities/mascotas/mascotaValidator.js";
import MascotaController from "../controllers/MascotaController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", MascotaController.getAllMascotas);

// Obtener un tipo de documento por ID
router.get("/usuario/:id", MascotaController.getAllMascotasByUsuarioId);

// Obtener un tipo de documento por ID
router.get("/:id", MascotaController.getMascotaById);

// Crear un nuevo tipo de documento
router.post("/", validarMascota, MascotaController.createMascota);

// Actualizar un tipo de documento
router.put("/:id", validarMascota, MascotaController.updateMascota);

// Actualizar un tipo de documento parcialmente
router.patch("/:id", validarMascotaParcial, MascotaController.updateMascota);

// Eliminar un tipo de documento
router.delete("/:id", MascotaController.deleteMascota);

export default router;
