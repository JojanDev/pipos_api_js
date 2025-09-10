import express from "express";

import {
  validarUsuario,
  validarUsuarioParcial,
} from "../middlewares/entities/usuarios/usuarioValidator.js";
import UsuarioController from "../controllers/UsuarioController.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los usuarios
router.get("/", authorize("usuario.read"), UsuarioController.getAllUsuarios);

// Obtener usuarios con rol cliente
router.get(
  "/clientes",
  authorize("usuario.read"),
  UsuarioController.getUsuariosClientes
);

// Obtener usuarios con rol empleado
router.get(
  "/empleados",
  authorize("usuario.read"),
  UsuarioController.getAllUsuariosEmpleados
);

// Obtener usuarios sin rol empleado
router.get(
  "/no-empleados",
  authorize("usuario.read"),
  UsuarioController.getAllUsuariosNoEmpleados
);

// Obtener usuarios sin rol cliente
router.get(
  "/no-clientes",
  authorize("usuario.read"),
  UsuarioController.getAllUsuariosNoClientes
);

// Obtener usuarios con rol veterinario
router.get(
  "/veterinarios",
  authorize("usuario.read"),
  UsuarioController.getUsuariosVeterinarios
);

// Obtener un usuario por ID
router.get("/:id", authorize("usuario.read"), UsuarioController.getUsuarioById);

// Crear un usuario (admin o cliente)
router.post(
  "/",
  authorize("usuario.create", "usuario.create-client"),
  validarUsuario,
  UsuarioController.createUsuario
);

// Actualizar un usuario (admin o cliente)
router.put(
  "/:id",
  authorize("usuario.update", "usuario.update-client"),
  validarUsuario,
  UsuarioController.updateUsuario
);

// Actualizar un usuario parcialmente (incluye cambio de estado)
router.patch(
  "/:id",
  authorize("usuario.update", "usuario.update-client", "usuario.change-state"),
  validarUsuarioParcial,
  UsuarioController.updateUsuario
);

// Eliminar un usuario
router.delete("/:id", UsuarioController.deleteUsuario);

export default router;
