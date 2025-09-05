import express from "express";

import {
  validarUsuario,
  validarUsuarioParcial,
} from "../middlewares/entities/usuarios/usuarioValidator.js";
import UsuarioController from "../controllers/UsuarioController.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", UsuarioController.getAllUsuarios);

router.get("/clientes", UsuarioController.getUsuariosClientes);

router.get("/no-clientes", UsuarioController.getAllUsuariosNoClientes);

router.get("/veterinarios", UsuarioController.getUsuariosVeterinarios);

// Obtener un tipo de documento por ID
router.get("/:id", UsuarioController.getUsuarioById);

// Crear un nuevo tipo de documento
router.post("/", validarUsuario, UsuarioController.createUsuario);

// Actualizar un tipo de documento
router.put("/:id", validarUsuario, UsuarioController.updateUsuario);

// Actualizar un tipo de documento parcialmente
router.patch("/:id", validarUsuarioParcial, UsuarioController.updateUsuario);

// Eliminar un tipo de documento
router.delete("/:id", UsuarioController.deleteUsuario);

export default router;
