import express from "express";

import {
  validarUsuario,
  validarUsuarioParcial,
} from "../middlewares/entities/usuarios/usuarioValidator.js";
import UsuarioController from "../controllers/UsuarioController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", authorize("usuario.read"), UsuarioController.getAllUsuarios);

router.get(
  "/clientes",
  authorize("usuario.read"),
  UsuarioController.getUsuariosClientes
);

router.get(
  "/empleados",
  authorize("usuario.read"),
  UsuarioController.getAllUsuariosEmpleados
);

router.get(
  "/no-empleados",
  authorize("usuario.read"),
  UsuarioController.getAllUsuariosNoEmpleados
);

router.get(
  "/no-clientes",
  authorize("usuario.read"),
  UsuarioController.getAllUsuariosNoClientes
);

router.get(
  "/veterinarios",
  authorize("usuario.read"),
  UsuarioController.getUsuariosVeterinarios
);

// Obtener un tipo de documento por ID
router.get("/:id", authorize("usuario.read"), UsuarioController.getUsuarioById);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("usuario.create", "usuario.create-client"),
  validarUsuario,
  UsuarioController.createUsuario
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("usuario.update", "usuario.update-client"),
  validarUsuario,
  UsuarioController.updateUsuario
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("usuario.update", "usuario.update-client", "usuario.change-state"),
  validarUsuarioParcial,
  UsuarioController.updateUsuario
);

// Eliminar un tipo de documento
router.delete("/:id", UsuarioController.deleteUsuario);

export default router;
