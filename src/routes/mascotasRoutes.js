import express from "express";

import {
  validarMascota,
  validarMascotaParcial,
} from "../middlewares/entities/mascotas/mascotaValidator.js";
import MascotaController from "../controllers/MascotaController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", authorize("mascota.read"), MascotaController.getAllMascotas);

// Obtener un tipo de documento por ID
router.get(
  "/usuario/:id",
  authorize("mascota.read"),
  MascotaController.getAllMascotasByUsuarioId
);

// Obtener un tipo de documento por ID
router.get("/:id", authorize("mascota.read"), MascotaController.getMascotaById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  validarMascota,
  authorize("mascota.create"),
  MascotaController.createMascota
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  validarMascota,
  authorize("mascota.update"),
  MascotaController.updateMascota
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  validarMascotaParcial,
  authorize("mascota.update"),
  MascotaController.updateMascota
);

// Eliminar un tipo de documento
router.delete(
  "/:id",
  authorize("mascota.disable"),
  MascotaController.deleteMascota
);

export default router;
