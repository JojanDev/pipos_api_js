import { ResponseProvider } from "../providers/ResponseProvider.js";
import RolUsuarioService from "../services/RolUsuarioService.js";

/**
 * Controlador para las rutas de "roles de usuarios".
 * Centraliza la gestión de peticiones HTTP y delega la lógica de negocio
 * al servicio RolUsuarioService.
 */
class RolUsuarioController {
  /**
   * Obtiene todos los roles de usuario.
   * Ruta: GET /roles-usuarios
   *
   * @param {import('express').Request}  req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getAllRolesUsuarios = async (req, res) => {
    try {
      const response = await RolUsuarioService.getAllRolesUsuarios();

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
      console.error("getAllRolesUsuarios error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene un rol de usuario por su ID.
   * Ruta: GET /roles-usuarios/:id
   *
   * @param {import('express').Request}  req  – req.params.id
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getRolUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await RolUsuarioService.getRolUsuarioById(id);

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
      console.error(`getRolUsuarioById error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Crea un nuevo rol de usuario.
   * Ruta: POST /roles-usuarios
   *
   * @param {import('express').Request}  req  – req.body con datos del rolUsuario
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static createRolUsuario = async (req, res) => {
    const rolUsuario = req.body;
    try {
      const response = await RolUsuarioService.createRolUsuario(rolUsuario);

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
      console.error("createRolUsuario error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualiza un rol de usuario existente por su ID.
   * Ruta: PUT /roles-usuarios/:id
   *
   * @param {import('express').Request}  req  – req.params.id y req.body con datos a actualizar
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static updateRolUsuario = async (req, res) => {
    const { id } = req.params;
    const rolUsuario = req.body;
    try {
      const response = await RolUsuarioService.updateRolUsuario(id, rolUsuario);

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
      console.error(`updateRolUsuario error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Elimina un rol de usuario por su ID.
   * Ruta: DELETE /roles-usuarios/:id
   *
   * @param {import('express').Request}  req  – req.params.id
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static deleteRolUsuario = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await RolUsuarioService.deleteRolUsuario(id);

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
      console.error(`deleteRolUsuario error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene todos los roles de un usuario específico.
   * Ruta: GET /usuarios/:id/roles-usuarios
   *
   * @param {import('express').Request}  req  – req.params.id (ID del usuario)
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getAllRolesUsuarioByUsuarioId = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await RolUsuarioService.getAllRolesUsuarioByUsuarioId(
        id
      );

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
      console.error(
        `getAllRolesUsuarioByUsuarioId error (usuarioId=${id}):`,
        error
      );
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default RolUsuarioController;
