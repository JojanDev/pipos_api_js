import { ResponseProvider } from "../providers/ResponseProvider.js";
import RolService from "../services/RolService.js";

/**
 * Controlador para las rutas relacionadas con roles del sistema.
 * Delega la lógica de negocio a RolService y centraliza las respuestas HTTP.
 */
class RolController {
  /**
   * Obtiene todos los roles registrados.
   * Ruta: GET /roles
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAllRoles = async (req, res) => {
    try {
      const response = await RolService.getAllRoles();

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
      console.error("getAllRoles error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene un rol por su ID.
   * Ruta: GET /roles/:id
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static getRolById = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await RolService.getRolById(id);

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
      console.error(`getRolById error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Crea un nuevo rol.
   * Ruta: POST /roles
   *
   * @param {import('express').Request} req - req.body contiene los datos del rol
   * @param {import('express').Response} res
   */
  static createRol = async (req, res) => {
    const rol = req.body;

    try {
      const response = await RolService.createRol(rol);

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
      console.error("createRol error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualiza un rol existente por su ID.
   * Ruta: PUT /roles/:id
   *
   * @param {import('express').Request} req - req.params.id y req.body con datos a actualizar
   * @param {import('express').Response} res
   */
  static updateRol = async (req, res) => {
    const { id } = req.params;
    const rol = req.body;

    try {
      const response = await RolService.updateRol(id, rol);

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
      console.error(`updateRol error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Elimina un rol por su ID.
   * Ruta: DELETE /roles/:id
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static deleteRol = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await RolService.deleteRol(id);

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
      console.error(`deleteRol error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene todos los roles que aplican únicamente a empleados.
   * Ruta: GET /roles/empleados
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAllRolesEmpleados = async (req, res) => {
    try {
      const response = await RolService.getAllRolesEmpleados();

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
      console.error("getAllRolesEmpleados error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default RolController;
