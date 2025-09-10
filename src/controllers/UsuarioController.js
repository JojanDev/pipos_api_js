import { ResponseProvider } from "../providers/ResponseProvider.js";
import UsuarioService from "../services/UsuarioService.js";

/**
 * Controlador para las rutas de "usuarios".
 * Centraliza la comunicación entre Express y UsuarioService,
 * y unifica las respuestas HTTP con ResponseProvider.
 */
class UsuarioController {
  /**
   * Obtiene todos los usuarios.
   * Ruta: GET /usuarios
   *
   * @param {import('express').Request}  req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getAllUsuarios = async (req, res) => {
    try {
      const response = await UsuarioService.getAllUsuarios();

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error("getAllUsuarios error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene un usuario por su ID.
   * Ruta: GET /usuarios/:id
   *
   * @param {import('express').Request}  req  – req.params.id
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await UsuarioService.getUsuarioById(id);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error(`getUsuarioById error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Crea un nuevo usuario.
   * Ruta: POST /usuarios
   *
   * @param {import('express').Request}  req  – req.body con datos del usuario
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static createUsuario = async (req, res) => {
    const usuario = req.body;
    try {
      const response = await UsuarioService.createUsuario(usuario);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        201
      );
    } catch (error) {
      console.error("createUsuario error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualiza un usuario existente por su ID.
   * Ruta: PUT /usuarios/:id
   *
   * @param {import('express').Request}  req  – req.params.id y req.body con datos a actualizar
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static updateUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = req.body;
    try {
      const response = await UsuarioService.updateUsuario(id, usuario);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        200
      );
    } catch (error) {
      console.error(`updateUsuario error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Elimina un usuario por su ID.
   * Ruta: DELETE /usuarios/:id
   *
   * @param {import('express').Request}  req  – req.params.id
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await UsuarioService.deleteUsuario(id);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error(`deleteUsuario error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene todos los usuarios clientes.
   * Ruta: GET /usuarios/clientes
   *
   * @param {import('express').Request}  req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getUsuariosClientes = async (req, res) => {
    try {
      const response = await UsuarioService.getUsuariosClientes();

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error("getUsuariosClientes error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene todos los usuarios veterinarios.
   * Ruta: GET /usuarios/veterinarios
   *
   * @param {import('express').Request}  req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getUsuariosVeterinarios = async (req, res) => {
    try {
      const response = await UsuarioService.getUsuariosVeterinarios();

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error("getUsuariosVeterinarios error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene todos los usuarios que no son clientes.
   * Ruta: GET /usuarios/no-clientes
   *
   * @param {import('express').Request}  req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getAllUsuariosNoClientes = async (req, res) => {
    try {
      const response = await UsuarioService.getAllUsuariosNoClientes();

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error("getAllUsuariosNoClientes error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene todos los usuarios empleados.
   * Ruta: GET /usuarios/empleados
   *
   * @param {import('express').Request}  req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getAllUsuariosEmpleados = async (req, res) => {
    try {
      const response = await UsuarioService.getAllUsuariosEmpleados();

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error("getAllUsuariosEmpleados error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene todos los usuarios que no son empleados.
   * Ruta: GET /usuarios/no-empleados
   *
   * @param {import('express').Request}  req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getAllUsuariosNoEmpleados = async (req, res) => {
    try {
      const response = await UsuarioService.getAllUsuariosNoEmpleados();

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error("getAllUsuariosNoEmpleados error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default UsuarioController;
