import express from "express";

import {
  validarMascota,
  validarMascotaParcial,
} from "../middlewares/entities/mascotas/mascotaValidator.js";
import MascotaController from "../controllers/MascotaController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todas las mascotas
router.get("/", authorize("mascota.read"), MascotaController.getAllMascotas);

// Obtener mascotas por ID de usuario
router.get(
  "/usuario/:id",
  authorize("mascota.read"),
  MascotaController.getAllMascotasByUsuarioId
);

// Obtener mascotas por ID de raza
router.get(
  "/raza/:id",
  authorize("mascota.read"),
  MascotaController.getAllMascotasByRazaId
);

// Obtener una mascota por ID
router.get("/:id", authorize("mascota.read"), MascotaController.getMascotaById);

// Crear una mascota
router.post(
  "/",
  validarMascota,
  authorize("mascota.create"),
  MascotaController.createMascota
);

// Actualizar una mascota (completo)
router.put(
  "/:id",
  validarMascota,
  authorize("mascota.update"),
  MascotaController.updateMascota
);

// Actualizar una mascota (parcial)
router.patch(
  "/:id",
  validarMascotaParcial,
  authorize("mascota.update"),
  MascotaController.updateMascota
);

// Eliminar una mascota
router.delete(
  "/:id",
  authorize("mascota.disable"),
  MascotaController.deleteMascota
);

export default router;
